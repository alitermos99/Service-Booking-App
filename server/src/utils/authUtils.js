import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";

export const ACCOUNT_TYPES = {
    customer: 'customer',
    business: 'business'
};

export const COOKIE_OPTIONS = (maxAge = 15 * 60 * 1000) => {
	return {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: maxAge
	}
};

export const generateTokens = (userId, userRole, expiresIn = '7d') => {
    const accessToken = jwt.sign(
        { id: userId, role: userRole },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: userId, role: userRole },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: expiresIn }
    );

    return { accessToken, refreshToken };
};

export const generatePasswordResetToken = (userId) => {
	return jwt.sign(
		{
			id: userId,
			purpose: "password_reset"
		},
		process.env.JWT_SECRET,
		{ expiresIn: "15m" }
	);
};

export const assertOwnership = (resource, resourceField, userId, message = 'Not authorized') => {
	if (!resource || resource[resourceField].toString() !== userId) {
		throw new ApiError(message, 403);
	}
};