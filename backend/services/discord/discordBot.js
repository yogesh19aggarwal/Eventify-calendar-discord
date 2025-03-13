import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import cron from "node-cron";
import { User } from "../../models/user.model.js";
import { getUpcomingEvents } from "../google/events.service.js";
import { logger } from "../../utils/winston.js";

dotenv.config();

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites
    ]
});

client.once("ready", async () => {
    logger.info(`Discord bot logged in as ${client.user.tag}!`);

    try {
        const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
        if (channel) {
            logger.info('Successfully connected to Discord channel');
        }
    } catch (error) {
        logger.error('Error connecting to Discord channel:', error);
    }

    cron.schedule("* * * * *", async () => {
        logger.debug('cron');
        await scheduleReminders();
    });
});

client.on('error', (error) => {
    logger.error('Discord client error:', error);
});

async function sendReminder(email, message) {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.discordId) {
        logger.error("No Discord ID found for user.");
        return;
    }

    const discordUser = await client.users.fetch(user.discordId);

    if (discordUser) {
        await discordUser.send(`Reminder: ${message} starts in 5 minutes!`);
        logger.info(`Message sent to ${discordUser.tag}`);
    }
}

async function scheduleReminders() {
    const users = await User.findAll();
    const now = new Date();

    for (const user of users) {
        const events = await getUpcomingEvents(user);

        for (const event of events) {
            const eventStart = new Date(event.start.dateTime);
            const minutesToEvent = Math.round((eventStart - now) / 60000);

            logger.debug(minutesToEvent);

            if (minutesToEvent === 5) {
                await sendReminder(user.email, event.summary);
            }
        }
    }
}
