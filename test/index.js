require('dotenv').config({ override: true });
const { Client } = require("../lib");
new Client({
	intents: ["Guilds"],
	token: process.env.TOKEN,
	mongo: process.env.MONGO
}).init("10");