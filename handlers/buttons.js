
// Volta tarafından yapıldı

module.exports = async (interaction, client) => {
    const queue = client.distube.getQueue(interaction.guild.id);

    if (!queue) return interaction.reply({ content: 'Şu anda çalan bir şarkı yok.', ephemeral: true });
// Volta tarafından yapıldı
    const id = interaction.customId;

    if (id === 'pause') {
        queue.pause();
        return interaction.reply({ content: '⏸️ Müzik durduruldu.' });
    }
// Volta tarafından yapıldı
    if (id === 'resume') {
        queue.resume();
        return interaction.reply({ content: '▶️ Müzik devam ediyor.' });
    }
// Volta tarafından yapıldı
    if (id === 'skip') {
        queue.skip();
        return interaction.reply({ content: '⏭️ Sonraki şarkıya geçildi.' });
    }
// Volta tarafından yapıldı
    if (id === 'stop') {
        queue.stop();
        return interaction.reply({ content: '🛑 Müzik durdu ve ses kanalından çıkıldı.' });
    }
}
// Volta tarafından yapıldı