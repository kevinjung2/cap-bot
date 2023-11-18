import { SlashCommandBuilder, bold } from 'discord.js';

// HANDLE LESS THAN 5 MESSAGES
async function buildMessageLeaderboard(messages, channel) {
	const messageLeaderboard = [];
	for (const message of messages) {
		const reactionMessage = message[1].reactions.resolve('🧢');
		if (!reactionMessage) continue;
		messageLeaderboard.push([reactionMessage.message.id, reactionMessage.count]);
	}
	const sorted = messageLeaderboard.sort((a, b) => { return b[1] - a[1]; }).slice(0, 5);
	const sortedMessages = [];
	for (const m of sorted) {
		const mess = await channel.messages.fetch({ message: m[0] });
		sortedMessages.push([mess, m[1]]);
	}
	return writeMessageLeaderboard(sortedMessages);
}

const writeMessageLeaderboard = array => {
	let messageString = '';
	messageString += bold('🧢\n----------Biggest Caps----------\n---------------------------------\n');
	messageString += `\n 1. ${array[0][0].content}     ${array[0][1]}x🧢\n
	2. ${array[1][0].content}     ${array[1][1]}x🧢\n
	3. ${array[2][0].content}     ${array[2][1]}x🧢\n
	4. ${array[3][0].content}     ${array[3][1]}x🧢\n
	5. ${array[4][0].content}     ${array[4][1]}x🧢\n`;
	return messageString;
};

async function buildUserLeaderboard(messages) {
	const userLeaderboard = {};
	const lbArray = [];
	for (const message of messages) {
		const reactionMessage = message[1].reactions.resolve('🧢');
		if (!reactionMessage) continue;
		// NEED TO HANDLE IF THERE ARE NO MENTIONS ON THE MESSAGE, IE SOMEONE PUTS CAPHAT NOT A NON /CAP MESSAGE
		const user = reactionMessage.message.mentions.users.map(i => i)[0];
		const count = parseInt(reactionMessage.count);
		if (userLeaderboard[user.id]) {
			userLeaderboard[user.id][0] += count;
		}
		else {
			userLeaderboard[user.id] = [count, user];
		}
	}
	console.log(userLeaderboard);
	for (const key of Object.keys(userLeaderboard)) {
		lbArray.push(userLeaderboard[key]);
	}
	console.log(lbArray);
	if (lbArray.length === 0) {
		return 'This server doesnt have any cappers yet!';
	}
	if (lbArray.length === 1) {
		return `The only Capper here is ${lbArray[0][1]} with ${lbArray[0][0]}x🧢`;
	}
	const sorted = lbArray.sort((a, b) => { return b[0] - a[0]; });
	if (sorted.length >= 5) {
		return writeUserLeaderboard(sorted.slice(0, 5));
	}
	return writeUserLeaderboard(sorted);
}

// HANDLE BETWEEN 2-4 CAPPERS
const writeUserLeaderboard = array => {
	console.log(array);
	let messageString = '';
	messageString += bold('🧢\n--------Biggest Cappers--------\n---------------------------------\n');
	messageString += `\n 1. ${array[0][1]}     ${array[0][0]}x🧢\n
	2. ${array[1][1]}     ${array[1][0]}x🧢\n`;
	if (array.length < 3) return messageString;
	messageString += `3. ${array[2][1]}     ${array[2][0]}x🧢\n`;
	if (array.length < 4) return messageString;
	messageString += `4. ${array[3][1]}     ${array[3][0]}x🧢\n`;
	if (array.length < 5) return messageString;
	messageString += `5. ${array[4][1]}     ${array[4][0]}x🧢\n`;
	return messageString;
};

export const data = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('fetch a leaderboard of the biggest cappers')
	.addStringOption(option => {
		return option.setName('type')
			.setDescription('Get the biggest caps, or the biggest cappers?')
			.setRequired(true)
			.addChoices(
				{ name: 'Biggest Capper', value: 'user' },
				{ name: 'Biggest Cap', value: 'message' },
			);
	});

export async function execute(interaction, channel) {
	// Handle grabbing more than 100 messages
	const messages = await channel.messages.fetch({ limit: 100 });
	let reply = '';

	switch (interaction.options.getString('type')) {
	case 'user':
		reply = await buildUserLeaderboard(messages);
		break;
	case 'message':
		reply = await buildMessageLeaderboard(messages, channel);
		break;
	default:
		break;
	}
	interaction.reply(reply);
	const message = await interaction.fetchReply();
	setTimeout(() => {message.delete();}, 30000);
}