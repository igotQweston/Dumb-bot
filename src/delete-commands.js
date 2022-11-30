const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config()
const { clientId, guildId1, guildId2, token } = process.env;

const rest = new REST({ version: '10' }).setToken(token);

const command=  { body: [] }

rest.put(Routes.applicationGuildCommands(clientId, guildId1), command)
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

rest.put(Routes.applicationGuildCommands(clientId, guildId2), command)
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);