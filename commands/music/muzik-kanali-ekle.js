const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('müzik-kanalı-ekle')
        .setDescription('Müzik komutlarının kullanılabileceği bir ses kanalını ekler')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Eklenecek ses kanalı')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');
        if (channel.type !== 2) return interaction.reply({ content: 'Sadece ses kanalları eklenebilir.', ephemeral: true });

        const configPath = './config.json';
        let config = { allowedVoiceChannels: [] };

        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }

        if (config.allowedVoiceChannels.includes(channel.id)) {
            return interaction.reply({ content: 'Bu kanal zaten ekli.', ephemeral: true });
        }

        config.allowedVoiceChannels.push(channel.id);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

        interaction.reply(`✅ **${channel.name}** müzik kanalı olarak eklendi.`);
    },
};
