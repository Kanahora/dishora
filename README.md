# Dishora
A framework extension of the [discord.js](https://discord.js.org) library.
This isn't for public use, there will not be a documentation or guide on how to use this framework.

## Requirements
- [discord.js 14.5.0](https://www.npmjs.com/package/discord.js)
- [distube 4.0.4](https://www.npmjs.com/package/distube)
- [mongoose 6.6.4](https://www.npmjs.com/package/mongoose)

## Installation
[Node.js 16.9.0](https://nodejs.org) or newer is required.

```sh
npm install dishora
```

### Initializing a new Client ###
```js
const { Client, GatewayIntentBits } = require("dishora");

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    token: "YOURTOKEN",
    mongo: "YOURMONGO",
    directories: {
        commands: "./commands",
        events: "./events"
    }
});
client.init("10");
```

### Creating a new Event ###
```js
const { Event } = require("dishora");

const event = new Event({
    event: "ready",
    on: async function(client) {
        console.log("Online!");
    };
});
```

### Creating a new Command ###
```js
const { Command, SlsahCommandBuilder } = require("dishora");
const Discord = require("discord.js");

const command = new Command({
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the client's response time."),
    run: async function(interaction) {
        interaction.reply(`${interaction.client.ws.ping}ms`);
    }
});
```
