import sendMail from "./utils/mailer";
import { createConsumer, createKafkaClient } from "@repo/kafka";
const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service");
import express from "express";
const app = express();
const PORT = process.env.PORT || 8004;
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", service: "email-service" });
});
const start = async () => {
    app.listen(PORT, () => {
        console.log(`Email service HTTP server running on port ${PORT}`);
    });
    try {
        await consumer.connect();
        await consumer.subscribe([
            {
                topicName: "user.created",
                topicHandler: async (message) => {
                    const { email, username } = message.value;
                    if (email) {
                        await sendMail({
                            email,
                            subject: "Welcome to Ecommerce App",
                            text: `Welcome ${username}. Your account has been created!`,
                        });
                    }
                },
            },
            {
                topicName: "order.created",
                topicHandler: async (message) => {
                    const { email, amount, status } = message.value;
                    if (email) {
                        await sendMail({
                            email,
                            subject: "Order has been created",
                            text: `Hello! Your order: Amount: ${amount}, Status: ${status}`,
                        });
                    }
                },
            },
        ]);
        console.log("Email service subscribed to Kafka topics successfully.");
    }
    catch (error) {
        console.warn("Kafka broker unreachable (email-service running in standby mode):", error);
    }
};
start();
