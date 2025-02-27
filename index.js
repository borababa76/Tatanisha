// Volta tarafından yapıldı

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
require('dotenv').config();
const loadDistubeEvents = require('./events/DistubeEvents');
const loadKeepAlive = require('./events/keepAlive'); 
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnStop: false,
    leaveOnEmpty: false,
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/music/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

loadDistubeEvents(client);
loadKeepAlive(client); 

client.login(process.env.TOKEN);
