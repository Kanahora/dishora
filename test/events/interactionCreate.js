const { Event } = require("../../lib");

module.exports = new Event({
	event: "interactionCreate",
	on: async function(client, interaction) {
		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);
			command.run(interaction);
		}
	}
})