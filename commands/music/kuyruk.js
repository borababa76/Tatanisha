const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kuyruk')
        .setDescription('Mevcut şarkı kuyruğunu gösterir'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guild.id);
        if (!queue) return interaction.reply({ content: 'Şu anda herhangi bir şarkı çalmıyor.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle('🎶 Mevcut Şarkı Kuyruğu')
            .setColor('Blue');

        queue.songs.forEach((song, index) => {
            embed.addFields({ name: `${index + 1}. ${song.name}`, value: `⏱️ Süre: ${song.formattedDuration}` });
        });

        interaction.reply({ embeds: [embed] });
    },
};
