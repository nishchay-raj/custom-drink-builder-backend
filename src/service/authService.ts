import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from "../lib/prisma";
import { env } from '../config/env';
import { Role } from '../generated/prisma/enums';

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.logins.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Invalid User Credentials!");
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
        throw new Error("Invalid Credentials!");
    }

    return {
        id: user.id,
        email: user.email,
        role: user.role,
    };
};

export const generateToken = (user: {
    id: string,
    email: string,
    role: Role
}) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const checkAuth = async (userId: string) => {
  const user = await prisma.logins.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};