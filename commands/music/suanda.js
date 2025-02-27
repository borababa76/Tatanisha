const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// Volta tarafından yapıldı
module.exports = {
    data: new SlashCommandBuilder()
        .setName('şuanda')
        .setDescription('Şu anda çalan şarkıyı gösterir'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guild.id);
        if (!queue || !queue.songs.length) return interaction.reply({ content: 'Şu anda herhangi bir şarkı çalmıyor.', ephemeral: true });

        const song = queue.songs[0];

        const embed = new EmbedBuilder()
            .setTitle('🎶 Şu Anda Çalan')
            .setColor('Green')
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: 'Şarkı Adı', value: song.name },
                { name: 'Süre', value: `${queue.formattedCurrentTime} / ${song.formattedDuration}` },
                { name: 'Ekleyen', value: song.user ? `<@${song.user.id}>` : 'Bilinmiyor' },
            );

        interaction.reply({ embeds: [embed] });
    },
};
