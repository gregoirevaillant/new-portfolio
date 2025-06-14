import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { DecodedToken } from "../types/DecodedToken";
import UserModel from "../models/User.model";

// @desc Register
// @route POST /auth/register
// @access Public
const register = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const duplicate = await UserModel.findOne({ email });

        if (duplicate) {
            res.status(409).json({ message: "Duplicate email" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            res.status(400).json({ message: "User not created" });
            return;
        }

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// @desc Login
// @route POST /auth
// @access Public
const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const lang = req.headers["accept-language"];

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
        res.status(401).json({ message: "Password or email incorrect" });
        return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        res.status(401).json({ message: "Password or email incorrect" });
        return;
    }

    const token = jwt.sign(
        {
            userID: user._id,
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user, message: "connected" });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = expressAsyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const refreshToken = cookies.jwt;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!refreshTokenSecret) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }

    const decoded = jwt.verify(
        refreshToken,
        refreshTokenSecret
    ) as DecodedToken;

    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = jwt.sign(
        {
            userID: user._id,
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "60m" }
    );

    res.json({ token, message: "Token refreshed" });
});

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.sendStatus(204);
        return;
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    res.status(204).json({ message: "deconnected" });
};

export default {
    register,
    login,
    refresh,
    logout,
};
