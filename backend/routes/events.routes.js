import { Router } from "express";
import {
    addEvent,
    deleteEvent,
    getAllEvents,
    updateEvent,
    getEvent
} from "../controllers/events.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", addEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
