const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const nekos = require('../api/nekos-best.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a-pat')
		.setDescription('Get random anime pat gifs from nekos.best'),
	async execute(interaction) {
        response=await nekos.search('pat')
        const apiEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(response.animeTitle)
            .setImage(response.imageUrl)
        await interaction.reply({ embeds: [apiEmbed] });

	},
};