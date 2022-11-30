const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config()
const { clientId, token } = process.env;

const rest = new REST({ version: '10' }).setToken(token);

const command=  { body: [] }

rest.put(Routes.applicationCommands(clientId), command)
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);