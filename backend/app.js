import express from "express";
import { config } from "./config/index.js";
import authRoutes from "./routes/auth.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import { client } from "./services/discord/discordBot.js";
import { sequelize, connectDB } from "./services/Database/database.js";
import morgan from "morgan";
import { logger } from "./utils/winston.js";
import cors from "cors";
import cookieParser from "cookie-parser";

connectDB();

sequelize
    .sync({ alter: true })
    .then(() => logger.info("Database synced!"))
    .catch((err) => logger.error(`Error syncing database: ${err}`)); 

client.login(config.discord.DISCORD_BOT_TOKEN);

const port = config.port || 3000;

const app = express();
app.use(express.json());

const allowedOrigins = ["https://eventify.vercel.app", "http://localhost:5173", "http://localhost:5174"];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(cookieParser());

// Use Morgan with Winston for HTTP request logging
app.use(morgan('combined', { 
    stream: { 
        write: (message) => logger.http(message.trim()) 
    } 
}));

app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);

// Global error handler
app.use((err, req, res, next) => {
    logger.error(`${err.stack || err.message || err}`);
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
    });
});

app.listen(port, () => logger.info(`Server running on port ${port}`));
