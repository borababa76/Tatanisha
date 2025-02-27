// Volta tarafından yapıldı

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

// Volta tarafından yapıldı
function isChannelAllowed(channelId) {
    const configPath = './config.json';
    if (!fs.existsSync(configPath)) return true;  
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return config.allowedVoiceChannels.includes(channelId);
}
// Volta tarafından yapıldı
module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Bir şarkı çal')
        .addStringOption(option =>
            option.setName('şarkı')
                .setDescription('Şarkı adı veya YouTube linki')
                .setRequired(true)),

    async execute(interaction, client) {
        const song = interaction.options.getString('şarkı');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) return interaction.reply({ content: 'Bir ses kanalında olman lazım!', ephemeral: true });
// Volta tarafından yapıldı
        
        if (!isChannelAllowed(voiceChannel.id)) {
            return interaction.reply({ content: 'Bu kanalda müzik çalamam. Yetkili bir kanalda dene.', ephemeral: true });
        }

        await interaction.deferReply();

        try {
            
            await client.distube.play(voiceChannel, song, {
                member: interaction.member,
                textChannel: interaction.channel
            });

            
            const queue = client.distube.getQueue(interaction.guild.id);
            const track = queue.songs[0];  

            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('🎶 Şarkı Çalınıyor')
                .setDescription(`**${track.name}** kuyruğa eklendi!`)
                .setURL(track.url)
                .setThumbnail(track.thumbnail) 
                .addFields(
                    { name: 'Süre', value: track.formattedDuration, inline: true },
                    { name: 'İzlenme', value: track.views?.toLocaleString() || 'Bilinmiyor', inline: true },
                    { name: 'Yükleyen', value: track.uploader.name || 'Bilinmiyor', inline: true }
                );
// Volta tarafından yapıldı
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('pause').setLabel('Durdur').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('resume').setLabel('Devam').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('skip').setLabel('Geç').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('stop').setLabel('Durdur & Çık').setStyle(ButtonStyle.Danger)
            );

            return interaction.editReply({ embeds: [embed], components: [row] });
        } catch (err) {
            console.error(err);
            return interaction.editReply({ content: 'Bir hata oluştu!', ephemeral: true });
        }
    }
};
// Volta tarafından yapıldı