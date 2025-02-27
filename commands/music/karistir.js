const { SlashCommandBuilder } = require('discord.js');
// Volta tarafından yapıldı
module.exports = {
    data: new SlashCommandBuilder()
        .setName('karıştır')
        .setDescription('Şarkı kuyruğunu karıştırır'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guild.id);
        if (!queue) return interaction.reply({ content: 'Şu anda herhangi bir şarkı çalmıyor.', ephemeral: true });
// Volta tarafından yapıldı
        queue.shuffle();
        interaction.reply('🔀 Kuyruk karıştırıldı!');
    },
};
