import { Router } from "express";
import {
    auth,
    login,
    logout,
    setToken,
    updateDiscord,
    checkDiscordStatus
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);

router.get("/", auth);

router.post("/set-token", setToken);

router.post("/logout", logout);

router.post("/update-discord", isAuthenticated, updateDiscord);

router.get("/check-discord-status", isAuthenticated, checkDiscordStatus);

export default router;
