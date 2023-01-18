const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const nekos = require('../api/nekos-best.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a-kitsune')
		.setDescription('Get random anime kitsune pics from nekos.best'),
	async execute(interaction) {
        response=await nekos.search('kitsune')
        const apiEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(response.sourceUrl)
            .setURL(response.sourceUrl)
            .setAuthor({ name: response.artist, url: response.artistUrl })
            .setImage(response.imageUrl)
        await interaction.reply({ embeds: [apiEmbed] });

	},
};