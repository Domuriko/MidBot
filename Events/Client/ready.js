const { Client, Discord } = require('discord.js');
const { CronJob } = require('cron');

module.exports = {
    name: "ready",
    execute(client) {
        console.log('The client is now ready.');
        client.user.setActivity('MidPoint Players', {type: 'WATCHING'});
    }
};