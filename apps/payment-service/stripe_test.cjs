const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'NGN',
                        product_data: {
                            name: 'Test Product',
                        },
                        unit_amount: 500000,
                    },
                    quantity: 1,
                }
            ],
            client_reference_id: 'test_user_id',
            mode: 'payment',
            ui_mode: 'custom',
            return_url: "http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}",
        });
        console.log("Success:", session.client_secret);
    } catch (err) {
        console.error("Stripe Error:", err);
    }
}

testStripe();
