import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { verifyRequestOrigin } from "lucia";

import { lucia } from "./lib/auth.js";

import { mainRouter } from "./routes/index.js";
import { loginRouter } from "./routes/login.js";
import { signupRouter } from "./routes/signup.js";
import { logoutRouter } from "./routes/logout.js";
import { validateRouter } from "./routes/validate.js";

import type { User, Session } from "lucia";
import { PERMITTED_ORIGIN, PORT } from "./lib/config.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
	if (req.method === "GET") {
		return next();
	}

	const originHeader = req.headers.origin ?? null;
	const hostHeader = req.headers.host ?? null;

	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader, PERMITTED_ORIGIN])) {
		return res.status(403).end();
	}
	return next();
});

app.use(async (req, res, next) => {

	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

	if (!sessionId) {
		res.locals.user = null;
		res.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}
	if (!session) {
		res.appendHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	res.locals.session = session;
	res.locals.user = user;
	return next();
});

app.use(mainRouter);
app.use("/api", loginRouter, signupRouter, validateRouter, logoutRouter);


app.listen(PORT);

console.log(`Server running on port ${PORT}`);

declare global {
	namespace Express {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}
