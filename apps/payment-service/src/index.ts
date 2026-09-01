import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";
import webhookRoute from "./routes/webhooks.route.js";

const app = new Hono();
app.use("*", clerkMiddleware());
app.use("*", cors({ origin: ["http://localhost:3002"] }));

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.route("/sessions", sessionRoute);
app.route("/webhooks", webhookRoute);

// app.get("/test", shouldBeUser, (c) => {  
//     return c.json({ 
//       message: "Payment service is Authenticated!",
//       userId: c.get("userId")
//   });
// });

// app.post("/create-stripe-product", async (c) => {  
//     const res = await stripe.products.create({
//       id: "123",
//       name: "Test Product",
//       default_price_data: {
//         currency: "NGN",
//         unit_amount: 29999.89 * 100, //Convert to kobo
//       },
//     });
//     return c.json(res);
// });

// app.get("/stripe-product-price", async (c) => {  
//     const res = await stripe.prices.list({
//       product: "123",
//     });
//     return c.json(res);
// });

const PORT = parseInt(process.env.PORT || "8002");

const start = async () => {
  try {
    try {
      await Promise.all([producer.connect(), consumer.connect()]);
      await runKafkaSubscriptions();
    } catch (kafkaErr) {
      console.warn("Kafka connection skipped/failed:", kafkaErr);
    }
    serve(
      {
        fetch: app.fetch,
        port: PORT,
      },
      (info) => {
        console.log(`Payment service is running on port ${PORT}`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();