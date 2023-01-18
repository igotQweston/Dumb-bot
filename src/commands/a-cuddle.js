const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const nekos = require('../api/nekos-best.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a-cuddle')
		.setDescription('Get random anime cuddle gifs from nekos.best'),
	async execute(interaction) {
        response=await nekos.search('cuddle')
        const apiEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(response.animeTitle)
            .setImage(response.imageUrl)
        await interaction.reply({ embeds: [apiEmbed] });

	},
};