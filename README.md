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
const Dishora = require("dishora");

const client = new Dishora.Client({
    intents: ["Guilds"],
    token: "YOURTOKEN",
    mongo: "YOURMONGO",
    directories: {
        commands: "./commands",
        events: "./events"
    }
});
client.init();
```

### Creating a new Event ###
```js
const Dishora = require("dishora");

const event = new Dishora.Event({
    event: "ready",
    on: async function(client) {
        console.log("Online!");
    };
});
```

### Creating a new Command ###
```js
const Dishora = require("dishora");
const Discord = require("discord.js");

const command = new Dishora.Command({
    data: new Discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the client's response time."),
    run: async function(interaction) {
        interaction.reply(`${interaction.client.ws.ping}ms`);
    }
});
```