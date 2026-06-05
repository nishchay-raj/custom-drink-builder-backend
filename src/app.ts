import { configDotenv } from "dotenv";
configDotenv();

import { env } from "./config/env"
import express from "express";
import paymentRoutes from "./routes/paymentRoutes";
import baseDrinkRoutes from './routes/basedrinkRoutes';
import flavors from './routes/flavourRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import addonRoutes from "./routes/addonRoutes";
import tableRoutes from "./routes/tableRoutes";

const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = Number(env.PORT);

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://dehradun-r6rs95i4y-divyshekhar-sinhas-projects.vercel.app",
        "https://dehradun-cms-28ua.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/health", (req, res) => {
    res.status(200).json({
        "message": "server is up and running"
    });
})

app.use(cookieParser());
app.use(express.json());

// app.use('/webhooks/phone', express.raw({ type: 'application/json' }));
app.use('/payment', paymentRoutes);
app.use('/flavor', flavors);
app.use('/basedrink', baseDrinkRoutes);
app.use('/addon', addonRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/table', tableRoutes);
app.use('/order', orderRoutes);
app.use('/auth', userRoutes);
app.use('/dashboard', dashboardRoutes);
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})