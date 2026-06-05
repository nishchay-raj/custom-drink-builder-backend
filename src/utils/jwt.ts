import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "";

export const sign_token = (payload: { userId: string }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verify_token = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
}