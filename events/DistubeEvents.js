// Volta tarafından yapıldı

module.exports = (client) => {
    client.distube
        .on('playSong', (queue, song) => {
            console.log(`🎶 Çalınıyor: ${song.name}`);
        })
        .on('addSong', (queue, song) => {
            console.log(`✅ Kuyruğa eklendi: ${song.name}`);
        })
        .on('error', (channel, error) => {
            console.error(`❌ Bir hata oluştu: ${error.message}`);
        })
        .on('finishSong', (queue, song) => {
            console.log(`✅ ${song.name} bitti.`);
        })
        .on('finish', (queue) => {
            console.log('✅ Tüm şarkılar bitti, ses kanalından çıkılıyor.');
        })
        .on('disconnect', (queue) => {
            console.log('❌ Bot ses kanalından ayrıldı.');
        })
        .on('empty', (queue) => {
            console.log('❌ Ses kanalı uzun süre boş kaldı, bot ayrıldı.');
        });
};
