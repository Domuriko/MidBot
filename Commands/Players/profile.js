const { Client, EmbedBuilder, MessageManager, MessageMentions } = require('discord.js');
const fs = require('fs');
const mpCard = require('../../midpointProfiles.json');
const mpPercent = require('../../midpointStats.json');
const publicCard = require('../../publicProfiles.json');
const publicPercent = require('../../publicStats.json');

module.exports = {
    name: 'profile',
    aliases: [],
    description: 'Shows the profile of the mentioned user.',
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {

        // Error Catching
        let user = message.mentions.users.first();

        switch(args[0]) {

            // Public Profiles
            case 'public':
                // If no ping
                if(!user) {

                    // Check if user set up a public profile
                    if(!publicCard[message.author.id]) return message.reply('You did not set up a public profile. Use `mp!profile setup` for more info.');
                
                    embed = new EmbedBuilder()
                        .setColor('Aqua')
                        .setAuthor({ name: `${message.author.tag}'s public profile`, iconURL: message.author.avatarURL()})
                        .addFields(
                            { name: 'Friend Code:', value: `${publicCard[message.author.id].fc}`, inline: true},
                            { name: 'Pronouns:', value: `${publicCard[message.author.id].pronouns}`, inline: true},
                            { name: 'Weapons Played:', value: `${publicCard[message.author.id].weapons}`, inline: true},
                            { name: 'Ranks:', value: '\u200B'},
                            { name: 'Splat Zones', value: `${publicCard[message.author.id].sz}`, inline: true},
                            { name: 'Tower Control', value: `${publicCard[message.author.id].tc}`, inline: true},
                            { name: 'Rainmaker', value: `${publicCard[message.author.id].rm}`, inline: true},
                            { name: 'Clam Blitz', value: `${publicCard[message.author.id].cb}`, inline: true},
                            { name: 'Draft Percentage:', value: `${publicPercent[message.author.id].percent}`}
                            )
                }

                // If ping
                else {

                    // Check if user set up a public profile
                    if(!publicCard[user.id]) return message.reply('This user did not set up a public profile.');

                    embed = new EmbedBuilder()
                        .setColor('Aqua')
                        .setAuthor({ name: `${user.tag}'s public profile`, iconURL: user.avatarURL()})
                        .addFields(
                            { name: 'Friend Code:', value: `${publicCard[user.id].fc}`, inline: true},
                            { name: 'Pronouns:', value: `${publicCard[user.id].pronouns}`, inline: true},
                            { name: 'Weapons Played:', value: `${publicCard[user.id].weapons}`, inline: true},
                            { name: 'Ranks:', value: '\u200B'},
                            { name: 'Splat Zones', value: `${publicCard[user.id].sz}`, inline: true},
                            { name: 'Tower Control', value: `${publicCard[user.id].tc}`, inline: true},
                            { name: 'Rainmaker', value: `${publicCard[user.id].rm}`, inline: true},
                            { name: 'Clam Blitz', value: `${publicCard[user.id].cb}`, inline: true},
                            { name: 'Draft Percentage:', value: `${publicPercent[user.id].percent}`}
                    )
                }
            break;

            // MidPoint Profiles
            case 'mp':
                // If no ping
                if(!user) {

                    // Check if user set up a MidPoint profile
                    if(!mpCard[message.author.id]) return message.reply('You did not set up a MidPoint profile. Use `mp!profile setup` for more info.');

                    embed = new EmbedBuilder()
                    .setColor('Aqua')
                    .setAuthor({ name: `${message.author.tag}'s MidPoint profile`, iconURL: message.author.avatarURL()})
                    .addFields(
                        { name: 'Friend Code:', value: `${mpCard[message.author.id].fc}`, inline: true},
                        { name: 'Pronouns:', value: `${mpCard[message.author.id].pronouns}`, inline: true},
                        { name: 'Weapons Played:', value: `${mpCard[message.author.id].weapons}`, inline: true},
                        { name: 'Ranks:', value: '\u200B'},
                        { name: 'Splat Zones', value: `${mpCard[message.author.id].sz}`, inline: true},
                        { name: 'Tower Control', value: `${mpCard[message.author.id].tc}`, inline: true},
                        { name: 'Rainmaker', value: `${mpCard[message.author.id].rm}`, inline: true},
                        { name: 'Clam Blitz', value: `${mpCard[message.author.id].cb}`, inline: true},
                        { name: 'Draft Percentage:', value: `${mpPercent[message.author.id].percent}`}
                    )
                }

                // If ping
                else {

                // Check if user set up a MidPoint profile
                if(!mpCard[user.id]) return message.reply('This user did not set up a MidPoint profile.');

                embed = new EmbedBuilder()
                    .setColor('Aqua')
                    .setAuthor({ name: `${user.tag}'s MidPoint profile`, iconURL: user.avatarURL()})
                    .addFields(
                        { name: 'Friend Code:', value: `${mpCard[user.id].fc}`, inline: true},
                        { name: 'Pronouns:', value: `${mpCard[user.id].pronouns}`, inline: true},
                        { name: 'Weapons Played:', value: `${mpCard[user.id].weapons}`, inline: true},
                        { name: 'Ranks:', value: '\u200B'},
                        { name: 'Splat Zones', value: `${mpCard[user.id].sz}`, inline: true},
                        { name: 'Tower Control', value: `${mpCard[user.id].tc}`, inline: true},
                        { name: 'Rainmaker', value: `${mpCard[user.id].rm}`, inline: true},
                        { name: 'Clam Blitz', value: `${mpCard[user.id].cb}`, inline: true},
                        { name: 'Draft Percentage:', value: `${mpPercent[user.id].percent}`}
                    )
                }
            break;

            // Setup
            case 'setup':
                if(args[1] === 'public') {
                    switch(args[2]) {
                        case 'fc':
                            fc = args[3];
                            pronouns = "N/A";
                            weapons = "N/A";
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = "N/A";

                            if(!publicCard[message.author.id]) {
                                publicCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                                fs.writeFile("./publicProfiles.json", JSON.stringify(publicCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            else {
                                publicCard[message.author.id].fc = fc;
                                fs.writeFile("./publicProfiles.json", JSON.stringify(publicCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your friend code has been updated successfully.')
                        break;
                        case 'pronouns':
                            fc = "N/A";
                            pronouns = args[3];
                            weapons = "N/A";
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = "N/A";

                            if(!publicCard[message.author.id]) {
                                publicCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                                fs.writeFile("./publicProfiles.json", JSON.stringify(publicCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            else {
                                publicCard[message.author.id].pronouns = pronouns;
                                fs.writeFile("./publicProfiles.json", JSON.stringify(publicCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your pronouns have been updated successfully.')
                        break;
                        case 'weapons':
                            fc = "N/A";
                            pronouns = "N/A";
                            weapons = message.content.slice(31).trim();
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = "N/A";

                            if(!publicCard[message.author.id]) {
                                publicCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                            }
                            else {
                                publicCard[message.author.id].weapons = weapons;
                                fs.writeFile("./publicProfiles.json", JSON.stringify(publicCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your weapons have been updated successfully.')
                        break;
                        case 'ranks':
                            fc = "N/A";
                            pronouns = "N/A";
                            weapons = "N/A";
                            sz = args[3];
                            tc = args[4];
                            rm = args[5];
                            cb = args[6];
                            team = "N/A";

                            if(!publicCard[message.author.id]) {
                                publicCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                            }
                            else {
                                publicCard[message.author.id].sz = sz;
                                publicCard[message.author.id].tc = tc;
                                publicCard[message.author.id].rm = rm;
                                publicCard[message.author.id].cb = cb;
                                fs.writeFile("./publicProfiles.json", JSON.stringify(publicCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your ranks have been updated successfully.')
                        break;
                        case 'team':
                            fc = "N/A";
                            pronouns = "N/A";
                            weapons = "N/A";
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = message.content.slice(29).trim();
                            if(!publicCard[message.author.id]) {
                                publicCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                            }
                            else {
                                publicCard[message.author.id].team = team;
                                fs.writeFile("./publicProfiles.json", JSON.stringify(publicCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your team has been updated successfully.')
                        break;
                    }
                }
                else if(args[1] === 'mp') {
                    switch(args[2]) {
                        case 'fc':
                            fc = args[3];
                            pronouns = "N/A";
                            weapons = "N/A";
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = "N/A";

                            if(!mpCard[message.author.id]) {
                                mpCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                                fs.writeFile("./midpointProfiles.json", JSON.stringify(mpCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            else {
                                mpCard[message.author.id].fc = fc;
                                fs.writeFile("./midpointProfiles.json", JSON.stringify(mpCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your friend code has been updated successfully.')
                        break;
                        case 'pronouns':
                            fc = "N/A";
                            pronouns = args[3];
                            weapons = "N/A";
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = "N/A";

                            if(!mpCard[message.author.id]) {
                                mpCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                                fs.writeFile("./midpointProfiles.json", JSON.stringify(mpCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            else {
                                mpCard[message.author.id].pronouns = pronouns;
                                fs.writeFile("./midpointProfiles.json", JSON.stringify(mpCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your pronouns have been updated successfully.')
                        break;
                        case 'weapons':
                            fc = "N/A";
                            pronouns = "N/A";
                            weapons = message.content.slice(31).trim();
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = "N/A";

                            if(!mpCard[message.author.id]) {
                                mpCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                            }
                            else {
                                mpCard[message.author.id].weapons = weapons;
                                fs.writeFile("./midpointProfiles.json", JSON.stringify(mpCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your weapons have been updated successfully.')
                        break;
                        case 'ranks':
                            fc = "N/A";
                            pronouns = "N/A";
                            weapons = "N/A";
                            sz = args[3];
                            tc = args[4];
                            rm = args[5];
                            cb = args[6];
                            team = "N/A";

                            if(!mpCard[message.author.id]) {
                                mpCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                            }
                            else {
                                mpCard[message.author.id].sz = sz;
                                mpCard[message.author.id].tc = tc;
                                mpCard[message.author.id].rm = rm;
                                mpCard[message.author.id].cb = cb;
                                fs.writeFile("./midpointProfiles.json", JSON.stringify(mpCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your ranks have been updated successfully.')
                        break;
                        case 'team':
                            fc = "N/A";
                            pronouns = "N/A";
                            weapons = "N/A";
                            sz = "N/A";
                            tc = "N/A";
                            rm = "N/A";
                            cb = "N/A";
                            team = message.content.slice(29).trim();
                            if(!mpCard[message.author.id]) {
                                mpCard[message.author.id] = {
                                    name: client.users.cache.get(message.author.id).tag,
                                    fc: fc,
                                    pronouns: pronouns,
                                    weapons: weapons,
                                    sz: sz,
                                    tc: tc,
                                    rm: rm,
                                    cb: cb,
                                    team: team
                                }
                            }
                            else {
                                mpCard[message.author.id].team = team;
                                fs.writeFile("./midpointProfiles.json", JSON.stringify(mpCard), (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            embed = new EmbedBuilder()
                                .setColor('Green')
                                .setDescription('Your team has been updated successfully.')
                        break;
                    }
                }
                else return message.reply('Usage: `mp!profile setup [public | mp] [fc | pronouns | weapons | ranks | team]`');
            break;

            // Catching different input
            default:
                return message.reply('Usage: `mp!profile [public | mp | setup | help]`');
        }
        // Send Embed
        return message.channel.send({embeds: [embed]});
    }
}