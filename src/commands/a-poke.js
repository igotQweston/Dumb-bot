const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const nekos = require('../api/nekos-best.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a-poke')
		.setDescription('Get random anime poke gifs from nekos.best'),
	async execute(interaction) {
        response=await nekos.search('poke')
        const apiEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(response.animeTitle)
            .setImage(response.imageUrl)
        await interaction.reply({ embeds: [apiEmbed] });

	},
};