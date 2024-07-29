import express from "express";

export const mainRouter = express.Router();

mainRouter.get("/", async (req, res, next) => {
	return res.status(200).json({
		message: "Welcome to the Auth-API (with lucia)!",
	});
});
