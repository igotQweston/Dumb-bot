const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const aniList =require('../api/aniList.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manga')
		.setDescription('Search for manga.')
        .addStringOption(option => option.setName('search').setDescription('Name of the manga').setRequired(true)),
	async execute(interaction) {
        response=await aniList.search( interaction.options.getString('search'), "MANGA")
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
                { name: 'Published', value: response.date },
                { name: 'Chapters', value: response.chapters, inline: true },
                { name: 'Volumes', value: response.volumes, inline: true },
                { name: 'Average Score', value: '**'.concat(response.averageScore+'**'), inline: true },
            )
        await interaction.reply({ embeds: [apiEmbed] });

	},
};