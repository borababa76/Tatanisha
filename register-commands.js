// Volta tarafından yapıldı

const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/music/${file}`);
    if (command.data) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`${commands.length} komut Discord'a yükleniyor...`);

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Tüm komutlar başarıyla yüklendi!');
    } catch (error) {
        console.error(error);
    }
})();
