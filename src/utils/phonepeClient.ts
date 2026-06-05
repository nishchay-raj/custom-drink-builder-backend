import { configDotenv } from "dotenv";
import { Env, StandardCheckoutClient } from "pg-sdk-node";
configDotenv();
const clientId = process.env.CLIENT_ID || "";
const clientSecret = process.env.CLIENT_SECRET || "";
const clientVersion = 1;
const env = Env.SANDBOX;

export const phonepeClient = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

