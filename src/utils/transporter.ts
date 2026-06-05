import { configDotenv } from "dotenv";

const nodemailer = require('nodemailer');
configDotenv();
const MAIL_USERNAME = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASS;
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    },
});