const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config()
const { clientId, guildId1, guildId2, token } = process.env

const commands = []
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId1),
			{ body: commands },
		).then((data) => console.log(`Successfully reloaded ${data.length} application (/) commands.`));
		
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId2),
			{ body: commands },
		).then((data) => console.log(`Successfully reloaded ${data.length} application (/) commands.`));
		}

		catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();