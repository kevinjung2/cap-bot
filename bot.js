import { Client, Events, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv';
import * as hello from './commands/hello.js';
import * as cap from './commands/cap.js'

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const readyDiscord = () => {
  console.log('ready');
};

async function handleInteraction(interaction){
  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
    case 'hello':
      await hello.execute(interaction);
    case 'cap':
      await cap.execute(interaction);
    default:
      console.log('unknown command');
  };
};

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);