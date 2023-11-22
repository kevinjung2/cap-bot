import { SlashCommandBuilder } from 'discord.js';

const reply = `Hi! I am Cap Bot and I'm here to let you know who's been capping in this server. 
			   Use /cap to let everyone know whos been capping and what they're yappin about now.
			   Use /leaderboard to see the biggest caps, or cappers in the server.`;

export const data = new SlashCommandBuilder()
	.setName('hello')
	.setDescription('Introduces cap bot and how to use it.');

export async function execute(interaction) {
	await interaction.reply(reply);
}