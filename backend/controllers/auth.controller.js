import {
    generateAuthUrl,
    getJwtToken,
    getUserProfile,
    oauth2Client,
    saveUser,
} from "../services/google/auth.service.js";
import { client } from "../services/discord/discordBot.js";
import { config } from "../config/index.js";
import { logger } from "../utils/winston.js";

export const login = (req, res) => {
    const url = generateAuthUrl();
    res.json({ Message: "Please visit url below to login", url });
};

export const auth = async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        let { email } = await getUserProfile();

        const user = await saveUser(email, tokens.refresh_token);

        const payload = { userId: user.id };

        const token = getJwtToken(payload);

        const redirectRoute = user.discordId ? '/calendar' : '/';

        res.send(`
            <script>
              window.opener.postMessage({
                type: 'oauth-success',
                token: '${token}',
                redirectTo: '${redirectRoute}'
              }, 'http://localhost:5173'); 
              window.close();
            </script>
          `);
    } catch (error) {
        res.status(500).send("Authentication failed");
    }
};

export const setToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }

        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 36000000,
        });

        res.send({ message: "cookies set successfully" });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const logout = (req, res) => {
    res.send("To be done");
};

export const updateDiscord = async (req, res) => {
    const { discordId } = req.body;

    try {
        const user = req.user;

        user.discordId = discordId;
        await user.save();

        logger.debug(`Attempting to fetch Discord channel with ID: ${config.discord.DISCORD_CHANNEL_ID}`);

        if (!client.isReady()) {
            logger.error('Discord client is not ready');
            return res.status(500).json({ message: "Discord bot is not connected" });
        }

        const channel = await client.channels.fetch(config.discord.DISCORD_CHANNEL_ID);
        
        if (!channel) {
            logger.error(`Channel not found with ID: ${config.discord.DISCORD_CHANNEL_ID}`);
            return res.status(404).json({ message: "Discord channel not found" });
        }

        if (!channel.permissionsFor(client.user)?.has('CreateInstantInvite')) {
            logger.error('Bot lacks permission to create invite');
            return res.status(403).json({ message: "Bot lacks permission to create invite" });
        }

        const invite = await channel.createInvite({
            maxAge: 604800,
            maxUses: 1 
        });

        res.json({ 
            message: "Discord ID updated successfully",
            inviteLink: invite.url
        });
    } catch (error) {
        logger.error('Error in updateDiscord:', error);
        if (error.code === 50001) {
            return res.status(403).json({ message: "Bot lacks access to the channel" });
        }
        res.status(500).json({ message: error.message || "Server error" });
    }
};

export const checkDiscordStatus = async (req, res) => {
    try {
        const user = req.user;
        
        const isMember = Boolean(user.discordId);
        
        res.json({
            isMember
        });
    } catch (error) {
        logger.error('Error checking Discord status:', error);
        res.status(500).json({ message: "Error checking Discord status" });
    }
};
