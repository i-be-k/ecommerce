import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string
const webhookRoute = new Hono();

webhookRoute.post("/stripe", async (c) => {
    const body = await c.req.text();
    const sig = c.req.header("stripe-signature")

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
    } catch (error) {
        console.log("Webhook verification failed!");
        return c.json({ error: "Webhook verification failed!" }, 400);
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            // console.log("Processing checkout.session.completed:", session.id);
            // console.log("Session details:", {
            //     client_reference_id: session.client_reference_id,
            //     amount_total: session.amount_total,
            //     payment_status: session.payment_status,
            //     customer_email: session.customer_details?.email
            // });

            const lineItems = await stripe.checkout.sessions.listLineItems(
                session.id
            );

            // TODO: CREATE ORDER
            producer.send("payment.successful", {
                value: {
                    userId: session.client_reference_id,
                    email: session.customer_details?.email,
                    amount: session.amount_total,
                    status: session.payment_status === "paid" ? "success" : "failed",
                    products: lineItems.data.map((item) => ({
                        name: item.description,
                        quantity: item.quantity,
                        price: item.price?.unit_amount,
                    })),
                    shippingAddress: session.customer_details?.address?.line1 || "No Address Provided",
                },
            });

            // console.log("Sending order data to Kafka:", orderData);
            // await producer.send("payment.successful", orderData);            

            break;

        default:
            break;
    }
    return c.json({ received: true });
});

export default webhookRoute;