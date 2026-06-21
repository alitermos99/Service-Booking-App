import asyncHandler from "express-async-handler";
import { 
	registerUser, 
	loginUser, 
	updateUserProfile, 
	changeUserPassword, 
	forgotUserPassword, 
	resetUserPassword, 
	getUserProfile, 
	deactivateUserAccount,
	refreshAccesToken
} from "../services/authService.js";
import { sanitizeUser } from '../utils/userUtils.js'
import { COOKIE_OPTIONS, generateTokens } from "../utils/authUtils.js";

export const register = asyncHandler(async (req, res) => {
	const { name, email, password, accountType, phone } = req.body;
	const user = await registerUser({ name, email, password, accountType, phone });

	const { accessToken, refreshToken } = generateTokens(user._id, user.role);

	res.cookie(
		"token",
		accessToken,
		COOKIE_OPTIONS(15 * 60 * 1000) // 15 mins
	);

	res.cookie(
		'refreshToken', 
		refreshToken, 
		COOKIE_OPTIONS(7 * 24 * 60 * 60 * 1000) // 7 days
	);

	return res.status(201).json({
		message: "User registered successfully",
		user: sanitizeUser(user)
	});
});

export const login = asyncHandler(async (req, res) => {
	const { email, password, saveThirtyDays } = req.body;
	const user = await loginUser({ email, password });

	const { accessToken, refreshToken } = generateTokens(user._id, user.role, saveThirtyDays ? '30d' : '7d');

	res.cookie(
		"token",
		accessToken,
		COOKIE_OPTIONS(15 * 60 * 1000) // 15 mins
	);

	res.cookie(
		'refreshToken', 
		refreshToken, 
		COOKIE_OPTIONS(7 * 24 * 60 * 60 * 1000) // 7 days
	);

	return res.status(200).json({
		user: sanitizeUser(user)
	});
});

export const logout = asyncHandler(async (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 0
	});
	
	return res.status(200).json({ message: "Logged out successfully" });
});

export const updateProfile = asyncHandler(async (req, res) => {
	const { name, phone, bio } = req.body;
	const user = await updateUserProfile(req.user.id, { name, phone, bio });

	return res.status(200).json({ 
		message: "Profile updated successfully", 
		user: sanitizeUser(user) 
	});
});


export const changePassword = asyncHandler(async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const user = await changeUserPassword(req.user.id, { currentPassword, newPassword });

	return res.status(200).json({
		message: "Password changed successfully",
		user: sanitizeUser(user)
	});
});

export const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;

	await forgotUserPassword({ email });
	return res.status(200).json({ message: "Password reset email sent" });
});

export const resetPassword = asyncHandler(async (req, res) => {
	const { token, newPassword } = req.body;

	await resetUserPassword({ token, newPassword });
	return res.status(200).json({ message: "Password reset successfully" });
});

export const deactivateUser = asyncHandler(async (req, res) => {
	await deactivateUserAccount(req.user.id);

	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 0
	});
	
	return res.status(200).json({ message: "User deactivated successfully" });
});

export const getProfile = asyncHandler(async (req, res) => {
	const user = await getUserProfile(req.user.id);

	return res.status(200).json({
		user: sanitizeUser(user)
	});
});

export const refreshToken = asyncHandler(async (req, res) => {
	const user = await refreshAccesToken(req.cookies.refreshToken);
	const { accessToken } = generateTokens(user._id, user.role);

	res.cookie(
		"token",
		accessToken,
		COOKIE_OPTIONS(15 * 60 * 1000) // 15 mins
	);

	return res.status(200).json({
		message: "Token refreshed"
	});
});