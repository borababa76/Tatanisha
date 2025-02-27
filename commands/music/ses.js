const { SlashCommandBuilder } = require('discord.js');
// Volta tarafından yapıldı
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ses')
        .setDescription('Müzik sesini ayarlar')
        .addIntegerOption(option =>
            option.setName('seviye')
                .setDescription('Ses seviyesi (0-100)')
                .setRequired(true)),
    async execute(interaction) {
        const volume = interaction.options.getInteger('seviye');
        const queue = interaction.client.distube.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply({ content: 'Şu anda herhangi bir şarkı çalmıyor.', ephemeral: true });
        if (volume < 0 || volume > 100) return interaction.reply({ content: 'Ses seviyesi 0 ile 100 arasında olmalıdır.', ephemeral: true });

        queue.setVolume(volume);
        interaction.reply(`🔊 Ses seviyesi ayarlandı: **%${volume}**`);
    },
};
