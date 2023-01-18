const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const nekos = require('../api/nekos-best.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a-shoot')
		.setDescription('Get random anime shoot gifs from nekos.best'),
	async execute(interaction) {
        response=await nekos.search('shoot')
        const apiEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(response.animeTitle)
            .setImage(response.imageUrl)
        await interaction.reply({ embeds: [apiEmbed] });

	},
};