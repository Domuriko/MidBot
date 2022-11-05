const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./botconfig.json');
const { CronJob } = require('cron');
const TOKEN = config.token;

// Initiate client
const client = new Client({ intents: [GatewayIntentBits.Guilds, 'MessageContent', 'GuildMessages'] });

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

['eventsHandler', 'commandsHandler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

client.on('ready', () => {
    const guild = client.guilds.cache.get('1009792175921442936');
    const channel = guild.channels.cache.get('1009891580171268188');
    // Seconds - Minutes - Hours - Day - Month - Weekday
    let scheduledMessage = new CronJob('00 00 18 * * *', () => {
        // This runs every day at 10:30:00, you can do anything you want
        
        channel.send("This is a <@&1010162087290478612> Auto-Draft ping!\n\nPlease react with \:MidPoint: to start a potential draft.\n\nNote: This ping will happen once a day at 6pm UTC.\nUse the time convertor below if you need it:\nhttps://www.timeanddate.com/worldclock/converter.html");
    });

    scheduledMessage.start();
})

client.login(TOKEN);