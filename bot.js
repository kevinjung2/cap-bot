import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as hello from './commands/hello.js';
import * as cap from './commands/cap.js';
import * as leaderboard from './commands/leaderboard.js';

config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

const readyDiscord = () => {
	console.log('ready');
};

async function getChannel(interaction) {
	return client.channels.fetch(interaction.channelId);
}

async function handleInteraction(interaction) {
	if (!interaction.isCommand()) return;
	switch (interaction.commandName) {
	case 'hello':
		await hello.execute(interaction);
		break;
	case 'cap':
		await cap.execute(interaction);
		break;
	case 'leaderboard': {
		const channel = await getChannel(interaction);
		await leaderboard.execute(interaction, channel);
		break;
	}
	default:
		console.log('unimplemented command');
	}
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);
