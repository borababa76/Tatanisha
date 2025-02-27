// Volta tarafından yapıldı

// Volta tarafından yapıldı

module.exports = (client) => {
    setInterval(() => {
        client.distube.queues.forEach(queue => {
            if (!queue.voice?.connection) {
                console.log(`Ses bağlantısı yok, yeniden bağlanmaya çalışılıyor: ${queue.textChannel.guild.name}`);
                client.distube.voices.join(queue.voiceChannel).catch(console.error);
            }
        });
    }, 30000); // 30 saniyede bir kontrol
};
