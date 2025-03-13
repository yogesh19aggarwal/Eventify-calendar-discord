import { google } from "googleapis";
import { oauth2Client } from "../services/google/auth.service.js";
import { logger } from "../utils/winston.js";

export const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export const getAllEvents = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const timeMin = today.toISOString();
        const timeMax = tomorrow.toISOString();

        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: "startTime",
        });

        res.json(response.data.items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addEvent = async (req, res) => {
    const event = req.body;

    try {
        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
        });

        res.json({
            message: "Event created successfully!",
            event: response.data,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    logger.debug(req.body);
    const updatedEvent = req.body;

    try {
        if (!id) {
            return res.status(400).json({ error: "Event ID is required" });
        }

        if (!updatedEvent) {
            return res.status(400).json({ error: "Updated event data is required" });
        }

        logger.debug(`Attempting to update event with ID: ${id}`);
        logger.debug('Updated event data:', updatedEvent);

        const response = await calendar.events.update({
            calendarId: "primary",
            eventId: id,
            resource: updatedEvent,
        });

        res.json({
            message: "Event updated successfully!",
            event: response.data,
        });
    } catch (error) {
        logger.error('Error updating event:', {
            eventId: id,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: error.message,
            details: "Failed to update event in Google Calendar"
        });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        await calendar.events.delete({
            calendarId: "primary",
            eventId: id,
        });

        res.json({ message: "Event deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEvent = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: "Event ID is required" });
        }

        logger.debug(`Attempting to fetch event with ID: ${id}`);

        const response = await calendar.events.get({
            calendarId: "primary",
            eventId: id,
        });

        res.json(response.data);
    } catch (error) {
        logger.error('Error fetching event:', {
            eventId: id,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: error.message,
            details: "Failed to fetch event from Google Calendar"
        });
    }
};
