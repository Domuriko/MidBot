const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['latency', 'lag'],
    description: 'Shows the ping of the bot.',
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {
        const Response = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`🏓 ${client.ws.ping}ms`);
        message.channel.send({embeds: [Response]});
    }
}