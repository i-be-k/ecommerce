import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify"
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
    return reply.send({ 
        message: "Order service is authenticated!",
        userId: request.userId,
    });
});

fastify.register(orderRoute);

const PORT = parseInt(process.env.PORT || "8001");

const start = async () => {
    try {
        await connectOrderDB();
        try {
            await Promise.all([producer.connect(), consumer.connect()]);
            await runKafkaSubscriptions();
        } catch (kafkaErr) {
            console.warn("Kafka connection skipped/failed:", kafkaErr);
        }
        await fastify.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`Order service is running on port ${PORT}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();
