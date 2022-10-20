const { Command, SlashCommandBuilder } = require('../../lib')
module.exports = new Command({
	data: new SlashCommandBuilder()
		.setName("name")
		.setDescription("description"),
	run: async function(interaction) {
		interaction.reply({ content: "Working.", ephemeral: true });
	}
})