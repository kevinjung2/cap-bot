import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('cap')
	.setDescription('Tell us who Capped and what they said se we can make sure they get what they deserve.')
	.addUserOption(option => {
		return option.setName('capper')
			.setDescription('Who Capped?')
			.setRequired(true);
	})
	.addStringOption(option => {
		return option.setName('cap')
			.setDescription('What did they say that was cap?')
			.setRequired(true);
	});

export async function execute(interaction) {
	const capper = interaction.options.getUser('capper');
	const theCap = interaction.options.getString('cap');

	interaction.reply(`Looks like ${capper} capped when they said:\n "${theCap}"`);
	const message = await interaction.fetchReply();
	message.react('🧢');
	return message;
}