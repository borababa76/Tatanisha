// Volta tarafından yapıldı

module.exports = (client) => {
    setInterval(() => {
        client.guilds.cache.forEach(guild => {
            const queue = client.distube.getQueue(guild.id);
            if (queue && queue.voice && !queue.voice.connection) {
                console.log(`Bağlantı kesilmiş! ${guild.name} ses kanalına tekrar bağlanmaya çalışılıyor.`);
                client.distube.voices.join(queue.voice.channel).catch(console.error);
            }
        });
    }, 30000); // 30 saniyede bir kontrol
};
