const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const nekos = require('../api/nekos-best.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a-waifu')
		.setDescription('Get random anime waifu pics from nekos.best'),
	async execute(interaction) {
        response=await nekos.search('waifu')
        const apiEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(response.sourceUrl)
            .setURL(response.sourceUrl)
            .setAuthor({ name: response.artist, url: response.artistUrl })
            .setImage(response.imageUrl)
        await interaction.reply({ embeds: [apiEmbed] });

	},
};