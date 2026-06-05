import { Request, Response } from "express"
import * as authService from "../service/authService"

export const loginAdminController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await authService.loginUser(email, password);

        const token = authService.generateToken(user);

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: "/",
        })

        return res.status(200).json({
            message: "User successfully signed in",
            role: user.role
        })
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            message: "Invalid username or password",
        })
    }
}

// export const createUserController = async (req: Request, res: Response) => {
//     try {
//         // const { email, password } = req.body;
//         const user = await authService.createUser(req.body);
//         return res.status(200).json({
//             message: "user created",
//             user: user,
//         });
//     } catch {
//         return res.status(400).json({
//             message: "could not create user",
//         });
//     }
// }

export const logoutUserController = async (req: Request, res: Response) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        return res.status(200).json({
            message: "user logout successfully",
        });
    } catch {
        return res.status(400).json({
            message: "could not logout user",
        })
    }
}


export const checkAuthController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id
        const user = await authService.checkAuth(userId);
        if (!user) {
            return res.status(401).json({
                error: "User not valid",
            })
        }

        return res.status(200).json({
            authenticated: true,
            user: user,
        })
    } catch {
        return res.status(400).json({
            message: "Internal server error.",
        })
    }
}