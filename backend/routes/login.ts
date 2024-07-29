import express from "express";
import { renderHTMLTemplate } from "../lib/html.js";
import { db } from "../lib/db.js";
import { verify } from "@node-rs/argon2";
import { lucia } from "../lib/auth.js";

import type { DatabaseUser } from "../lib/db.js";

export const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
	const username: string | null = req.body.username ?? null;
	if (!username || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
		return res.status(404).json({ error: "Invalid Credentials" });
	}
	const password: string | null = req.body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		return res.status(404).json({ error: "Invalid Credentials" });
	}

	const existingUser = db.prepare("SELECT * FROM user WHERE username = ?").get(username) as
		| DatabaseUser
		| undefined;
	if (!existingUser) {
		return res.status(404).json({ error: "Invalid Credentials" });
	}

	const validPassword = await verify(existingUser.password_hash, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	if (!validPassword) {
		return res.status(404).json({ error: "Invalid Credentials" });
	}

	const session = await lucia.createSession(existingUser.id, {});
	res
		.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.appendHeader("Location", "/")
		.json({ message: "User successfully logged in" })
});

