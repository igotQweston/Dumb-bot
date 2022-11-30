const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const aniList =require('../api/aniList.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Search for anime.')
        .addStringOption(option => option.setName('search').setDescription('Name of the anime').setRequired(true)),
	async execute(interaction) {
        response=await aniList.search( interaction.options.getString('search'), "ANIME")
        const apiEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(response.title)
            .setURL(response.url)
            .setDescription(response.description)
            .setThumbnail(response.imageUrl)
            .addFields(
                { name: 'Status', value: response.status, inline: true },
                { name: 'Type', value: response.format, inline: true },
                { name: 'Genres', value: response.genres },
                { name: 'Aired', value: response.date },
                { name: 'Total Episodes', value: response.episodes, inline: true },
                { name: 'Duration', value: response.duration, inline: true },
                { name: 'Average Score', value: '**'.concat(response.averageScore+'**'), inline: true ,},
            )
        await interaction.reply({ embeds: [apiEmbed] });

	},
};