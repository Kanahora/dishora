import { GatewayIntentBits } from 'discord.js';
import { Client } from "../src";
import dotenv from 'dotenv';
dotenv.config({ override: true });
new Client({
    intents: [GatewayIntentBits.Guilds],
    token: process.env.TOKEN as string,
    directories: {
        commands: "commandsts",
        events: "eventsts"
    }
}).init("10");