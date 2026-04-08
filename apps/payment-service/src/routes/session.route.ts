import { Hono } from "hono";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";
import { CartItemsType } from "@repo/types";
import { getStripeProductPrice } from "../utils/stripeProduct";

const sessionRoute = new Hono();

sessionRoute.post('/create-checkout-session', shouldBeUser, async (c) => {
    const { cart }: { cart: CartItemsType } = await c.req.json();
    const userId = c.get("userId");
    
    const lineItems = await Promise.all(
        cart.map(async (item) => {
            const unitAmount = await getStripeProductPrice(item.id);
            let finalAmount = (typeof unitAmount === 'number') ? unitAmount : Math.round(Number(item.price) * 100);
            if (!finalAmount || isNaN(finalAmount)) {
                finalAmount = 100000; // fallback to prevent stripe crash
            }
            
            // Enforce Stripe minimum of ~50 cents USD (approx 750 NGN -> 75000 kobo)
            finalAmount = Math.max(finalAmount, 100000); // Enforcing 1000 NGN minimum

            return {
                price_data: {
                    currency: 'NGN',
                    product_data: {
                        name: item.name || "Product",
                    },
                    unit_amount: Math.round(finalAmount),
                },
                quantity: Math.max(1, parseInt(item.quantity as any) || 1),
            };
        })
    );

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            client_reference_id: userId,
            mode: 'payment',
            ui_mode: 'custom',
            return_url: "http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}",
        });
    
        // console.log("Stripe session created:", session.id);
        return c.json({ checkoutSessionClientSecret: session.client_secret });
    }   catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return c.json({ error: error.message || "Failed to create checkout session" });
    }
});

sessionRoute.get("/:session_id", async (c) => {
    const { session_id } = c.req.param();
    const session = await stripe.checkout.sessions.retrieve(
        session_id as string,
        {
            expand: ["line_items"],
        }
    );

    // console.log(session);

    return c.json({
        status: session.status,
        paymentStatus: session.payment_status,
    });
});

export default sessionRoute;
