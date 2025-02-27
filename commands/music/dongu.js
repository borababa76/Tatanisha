const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('döngü')
        .setDescription('Şarkı veya kuyruk döngüsünü ayarlar')
        .addStringOption(option =>
            option.setName('mod')
                .setDescription('Döngü modu')
                .setRequired(true)
                .addChoices(
                    { name: 'Tek Şarkı', value: '1' },
                    { name: 'Kuyruk', value: '2' },
                    { name: 'Kapalı', value: '0' },
                )),
    async execute(interaction) {
        const mode = parseInt(interaction.options.getString('mod'));
        const queue = interaction.client.distube.getQueue(interaction.guild.id);
        if (!queue) return interaction.reply({ content: 'Şu anda herhangi bir şarkı çalmıyor.', ephemeral: true });

        queue.setRepeatMode(mode);

        const modeText = mode === 0 ? 'Kapalı' : mode === 1 ? 'Tek Şarkı' : 'Kuyruk';
        interaction.reply(`🔁 Döngü modu ayarlandı: **${modeText}**`);
    },
};
