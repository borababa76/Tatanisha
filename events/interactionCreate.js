// Volta tarafından yapıldı

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(`Komut çalıştırılırken hata oluştu: ${interaction.commandName}`);
                console.error(error);
                return interaction.reply({ content: 'Komutu çalıştırırken bir hata meydana geldi.', ephemeral: true }).catch(() => {});
            }
        } 
        
        else if (interaction.isButton()) {
            try {
                require('../handlers/buttons.js')(interaction, client);
            } catch (error) {
                console.error('Buton etkileşimi sırasında hata oluştu.');
                console.error(error);
                return interaction.reply({ content: 'Bir hata meydana geldi.', ephemeral: true }).catch(() => {});
            }
        }

        // Volta tarafından yapıldı
        //else if (interaction.isStringSelectMenu()) {
            //return interaction.reply({ content: 'Bu özellik henüz eklenmedi.', ephemeral: true });
       // } bu kısım ekstra siz modal selectmenu gibi özellikler eklemek isterseniz açıp gerektiği gibi doldurabilirsiniz
    }
};
