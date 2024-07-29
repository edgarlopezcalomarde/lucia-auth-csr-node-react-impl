import express, { Request, Response } from "express"
import { lucia } from "../lib/auth.js";

export const validateRouter = express.Router()

validateRouter.post("/validate", async (req: Request, res: Response) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (!sessionId) {
        res.locals.user = null;
        res.locals.session = null;
        return res.status(403).json({ message: "Session expired" })
    }

    res.json({ ...res.locals.user })
})