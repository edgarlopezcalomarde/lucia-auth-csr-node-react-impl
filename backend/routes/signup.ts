import express from "express";
import { db } from "../lib/db.js";
import { hash } from "@node-rs/argon2";
import { lucia } from "../lib/auth.js";
import { SqliteError } from "better-sqlite3";
import { generateId } from "lucia";

export const signupRouter = express.Router();
signupRouter.post("/signup", async (req, res) => {

	const username: string | null = req.body.username ?? null;

	if (!username || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
		return res.status(404).json({ error: "Username Not Found" });
	}

	const password: string | null = req.body.password ?? null;

	if (!password || password.length < 6 || password.length > 255) {
		return res.status(404).json({ error: "Password Not Found" });
	}

	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	const userId = generateId(15);

	try {
		db.prepare("INSERT INTO user (id, username, password_hash) VALUES(?, ?, ?)").run(
			userId,
			username,
			passwordHash
		);

		const session = await lucia.createSession(userId, {});
		return res
			.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
			.json({ message: "User created" });


	} catch (e) {
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return res.status(404).json({ error: "Username already exists" });
		}
		return res.status(404).json({ error: "An unknown error occurred" });
	}
});
