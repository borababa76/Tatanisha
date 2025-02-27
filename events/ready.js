
// Volta tarafından yapıldı

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot aktif: ${client.user.tag}`);
    }
}
