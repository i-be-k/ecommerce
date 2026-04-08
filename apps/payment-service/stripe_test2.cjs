const fs = require('fs');

// Simple parse of .env
const envContent = fs.readFileSync('.env', 'utf8');
let stripeKey = '';
envContent.split('\n').forEach(line => {
    if (line.startsWith('STRIPE_SECRET_KEY=')) {
        stripeKey = line.replace('STRIPE_SECRET_KEY=', '').trim();
    }
});

const stripe = require('stripe')(stripeKey);

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
        console.error("Stripe Error Here:", err.message);
    }
}

testStripe();
