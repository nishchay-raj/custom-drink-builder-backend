function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env variable: ${name}`);
    }
    return value;
}

function normalizeDatabaseUrl(url: string): string {
    if (process.env.NODE_ENV === "production") {
        return url;
    }

    const parsed = new URL(url);
    parsed.searchParams.set("sslmode", "no-verify");
    return parsed.toString();
}

export const env = {
    PORT: process.env.PORT || "5000",
    DATABASE_URL: normalizeDatabaseUrl(requireEnv("DATABASE_URL")),
    JWT_SECRET: requireEnv("JWT_SECRET"),
    RAZORPAY_KEY_ID: requireEnv("RAZORPAY_KEY_ID"),
    RAZORPAY_KEY_SECRET: requireEnv("RAZORPAY_KEY_SECRET"),
};