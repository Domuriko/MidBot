const { Client, EmbedBuilder, Embed } = require('discord.js');
const fs = require('fs');
const publicStats = require('../../publicStats.json');
const mpStats = require('../../midpointStats.json');
const publicProfile = require('../../publicProfiles.json');
const mpProfile = require('../../midpointProfiles.json');
const totalDrafts = require('../../totalDrafts.json');

module.exports = {
    name: 'report',
    aliases: [],
    description: 'Report the score of a public or MidPoint draft.',
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {

        let Reply = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Error!");

        switch(args[0]) {
            case 'public':
                if(!args[1] || !args[2] || !args[3] || !args[4] || !args[5] || !args[6] || !args[7] || !args[8] || !args[9]) return message.reply('Usage: `mp!report [public | mp] <player 1> <player 2> <player 3> <player 4> <score (X-Y)> <player 5> <player 6> <player 7> <player 8>`');
                
                
                let score = args[5].split('-');
                let players = message.mentions.users.first(8);
                let p1 = players[0];
                let p2 = players[1];
                let p3 = players[2];
                let p4 = players[3];

                let t1Score = parseInt(score[0]);
                let t2Score = parseInt(score[1]);

                let p5 = players[4];
                let p6 = players[5];
                let p7 = players[6];
                let p8 = players[7];

                let oldStats = [];

                let t1Win = t1Score > t2Score;

                for(let i = 0; i < 4; i++) {
                    if(!publicStats[players[i].id]) {
                        publicStats[players[i].id] = {
                            name: players[i].id.tag,
                            draftsPlayed: 1,
                            gamesPlayed: t1Score + t2Score,
                            gamesWon: 0 + t1Score,
                            draftsWon: t1Win ? 1 : 0,
                            percent: t1Win ? 100 : 0
                        }
                        oldStats[i] = t1Win ? 100 : 0;
                        fs.writeFile('./publicStats.json', JSON.stringify(publicStats), (err) => { if (err) console.log(err)});
                    }
                    else {
                        oldStats[i] = publicStats[players[i].id].percent;
                        publicStats[players[i].id].draftsPlayed += 1;
                        publicStats[players[i].id].draftsWon += t1Win ? 1 : 0;
                        publicStats[players[i].id].gamesPlayed += t1Score + t2Score
                        publicStats[players[i].id].gamesWon += t1Score;
                        // (games won / games played)*100 + (sets won / sets played)*100 = new percentage
                        // new percentage / 2 = intital percentage
                        // initial percentage + ((sets played / sets played by everyone in current cycle) / 5) = final draft percentage
                        let newPercentage = (publicStats[players[i].id].gamesWon / publicStats[players[i].id].gamesPlayed) * 100 + (publicStats[players[i].id].draftsWon / publicStats[players[i].id].draftsPlayed) * 100;
                        let initialPercentage = newPercentage / 2;
                        let finalPercentage = initialPercentage + ((publicStats[players[i].id].draftsPlayed / totalDrafts["public"].allDrafts) / 5)
                        publicStats[players[i].id].percent = finalPercentage;
                        
                        fs.writeFile('./publicStats.json', JSON.stringify(publicStats), (err) => { if (err) console.log(err)});
                    }
                }
                for(i = 4; i < 8; i++) {
                    if(!publicStats[players[i].id]) {
                        publicStats[players[i].id] = {
                            name: players[i].id.tag,
                            draftsPlayed: 1,
                            gamesPlayed: t1Score + t2Score,
                            gamesWon: 0 + t2Score,
                            draftsWon: t1Win ? 0 : 1,
                            percent: t1Win ? 0 : 100
                        }
                        oldStats[i] = t1Win ? 0 : 100;
                        fs.writeFile('./publicStats.json', JSON.stringify(publicStats), (err) => { if (err) console.log(err)});
                    }
                    else {
                        oldStats[i] = publicStats[players[i].id].percent;
                        publicStats[players[i].id].draftsPlayed += 1;
                        publicStats[players[i].id].draftsWon += t1Win ? 0 : 1;
                        publicStats[players[i].id].gamesPlayed += t1Score + t2Score;
                        publicStats[players[i].id].gamesWon += t2Score;
                        // (games won / games played)*100 + (sets won / sets played)*100 = new percentage
                        // new percentage / 2 = intital percentage
                        // initial percentage + ((sets played / sets played by everyone in current cycle) / 5) = final draft percentage
                        let newPercentage = (publicStats[players[i].id].gamesWon / publicStats[players[i].id].gamesPlayed) * 100 + (publicStats[players[i].id].draftsWon / publicStats[players[i].id].draftsPlayed) * 100;
                        let initialPercentage = newPercentage / 2;
                        let finalPercentage = initialPercentage + ((publicStats[players[i].id].draftsPlayed / totalDrafts["public"].allDrafts) / 5)
                        publicStats[players[i].id].percent = Math.round(finalPercentage, 3);
                        
                        fs.writeFile('./publicStats.json', JSON.stringify(publicStats), (err) => { if (err) console.log(err)});
                    }
                }

                Reply
                .setColor('Blue')
                .setTitle('Draft Results')
                .addFields(
                    { name: 'Team Alpha', value: `${p1.tag}: ${oldStats[0]}% -> ${publicStats[p1.id].percent}%\n${p2.tag}: ${oldStats[1]}% -> ${publicStats[p2.id].percent}%\n${p3.tag}: ${oldStats[2]}% -> ${publicStats[p3.id].percent}%\n${p4.tag}: ${oldStats[3]}% -> ${publicStats[p4.id].percent}%`},
                    { name: 'Team Beta', value: `${p5.tag}: ${oldStats[4]}% -> ${publicStats[p5.id].percent}%\n${p6.tag}: ${oldStats[5]}% -> ${publicStats[p6.id].percent}%\n${p7.tag}: ${oldStats[6]}% -> ${publicStats[p7.id].percent}%\n${p8.tag}: ${oldStats[7]}% -> ${publicStats[p8.id].percent}%`}
                );

                if(!totalDrafts["public"]) {
                    totalDrafts["public"] = {
                        name: "public",
                        allDrafts: 1
                    }
                }
                else totalDrafts["public"].allDrafts += parseInt(1);
                fs.writeFile('./totalDrafts.json', JSON.stringify(totalDrafts), (err) => { if (err) console.log(err)});
                break;

            case 'mp':
                if(!message.member.roles.cache.some(r=>["MidPoint"].includes(r.name))) return message.reply('You do not have the required permissions to use this subcommand. Required role: `MidPoint`');
                if(!args[1] || !args[2] || !args[3] || !args[4] || !args[5] || !args[6] || !args[7] || !args[8] || !args[9]) return message.reply('Usage: `mp!report [public | mp] <player 1> <player 2> <player 3> <player 4> <score (X-Y)> <player 5> <player 6> <player 7> <player 8>`');
                
                
                score = args[5].split('-');
                players = message.mentions.users.first(8);
                p1 = players[0];
                p2 = players[1];
                p3 = players[2];
                p4 = players[3];

                t1Score = parseInt(score[0]);
                t2Score = parseInt(score[1]);

                p5 = players[4];
                p6 = players[5];
                p7 = players[6];
                p8 = players[7];

                oldStats = [];

                t1Win = t1Score > t2Score;

                totalDrafts["midpoint"].allDrafts += 1;

                for(let i = 0; i < 4; i++) {
                    if(!midpointStats[players[i].id]) {
                        midpointStats[players[i].id] = {
                            name: players[i].id.tag,
                            draftsPlayed: 1,
                            gamesPlayed: t1Score + t2Score,
                            gamesWon: 0 + t1Score,
                            draftsWon: t1Win ? 1 : 0,
                            percent: t1Win ? 100 : 0
                        }
                        oldStats[i] = t1Win ? 1 : 0;
                        fs.writeFile('./midpointStats.json', JSON.stringify(midpointStats), (err) => { if (err) console.log(err)});
                    }
                    else {
                        oldStats[i] = pmidpointStats[players[i].id].percent;
                        midpointStats[players[i].id].draftsPlayed += 1;
                        midpointStats[players[i].id].draftsWon += t1Win ? 1 : 0;
                        midpointStats[players[i].id].gamesPlayed += 8;
                        midpointStats[players[i].id].gamesWon += t1Score;
                        // (games won / games played)*100 + (sets won / sets played)*100 = new percentage
                        // new percentage / 2 = intital percentage
                        // initial percentage + ((sets played / sets played by everyone in current cycle) / 5) = final draft percentage
                        let newPercentage = (midpointStats[players[i].id].gamesWon / midpointStats[players[i].id].gamesPlayed) * 100 + (midpointStats[players[i].id].draftsWon / midpointStats[players[i].id].draftsPlayed) * 100;
                        let initialPercentage = newPercentage / 2;
                        let finalPercentage = initialPercentage + ((midpointStats[players[i].id].draftsPlayed / totalDrafts["public"].allDrafts) / 5)
                        midpointStats[players[i].id].percent = Clamp(finalPercentage, 0, 100);
                        
                        fs.writeFile('./midpointStats.json', JSON.stringify(midpointStats), (err) => { if (err) console.log(err)});
                    }
                }
                for(i = 4; i < 8; i++) {
                    if(!midpointStats[players[i].id]) {
                        midpointStats[players[i].id] = {
                            name: players[i].id.tag,
                            draftsPlayed: 1,
                            gamesPlayed: t1Score + t2Score,
                            gamesWon: 0 + t2Score,
                            draftsWon: t1Win ? 0 : 1,
                            percent: t1Win ? 0 : 100
                        }
                        oldStats[i] = t1Win ? 1 : 0;
                        fs.writeFile('./midpointStats.json', JSON.stringify(midpointStats), (err) => { if (err) console.log(err)});
                    }
                    else {
                        oldStats[i] = midpointStats[players[i].id].percent;
                        midpointStats[players[i].id].draftsPlayed += 1;
                        midpointStats[players[i].id].draftsWon += t1Win ? 0 : 1;
                        midpointStats[players[i].id].gamesPlayed += t1Score + t2Score;
                        midpointStats[players[i].id].gamesWon += t2Score;
                        // (games won / games played)*100 + (sets won / sets played)*100 = new percentage
                        // new percentage / 2 = intital percentage
                        // initial percentage + ((sets played / sets played by everyone in current cycle) / 5) = final draft percentage
                        let newPercentage = (midpointStats[players[i].id].gamesWon / midpointStats[players[i].id].gamesPlayed) * 100 + (midpointStats[players[i].id].draftsWon / midpointStats[players[i].id].draftsPlayed) * 100;
                        let initialPercentage = newPercentage / 2;
                        let finalPercentage = initialPercentage + ((midpointStats[players[i].id].draftsPlayed / totalDrafts["public"].allDrafts) / 5)
                        midpointStats[players[i].id].percent = Clamp(finalPercentage, 0, 100);
                        
                        fs.writeFile('./midpointStats.json', JSON.stringify(midpointStats), (err) => { if (err) console.log(err)});
                    }
                }

                Reply
                .setColor('Blue')
                .setTitle('Draft Results')
                .addFields(
                    { name: 'Team Alpha', value: `${p1.tag}: ${oldStats[0]}% -> ${midpointStats[p1.id].percent}%\n${p2.tag}: ${oldStats[1]}% -> ${midpointStats[p2.id].percent}%\n${p3.tag}: ${oldStats[2]}% -> ${midpointStats[p3.id].percent}%\n${p4.tag}: ${oldStats[3]}% -> ${midpointStats[p4.id].percent}%`},
                    { name: 'Team Beta', value: `${p5.tag}: ${oldStats[4]}% -> ${midpointStats[p5.id].percent}%\n${p6.tag}: ${oldStats[5]}% -> ${midpointStats[p6.id].percent}%\n${p7.tag}: ${oldStats[6]}% -> ${midpointStats[p7.id].percent}%\n${p8.tag}: ${oldStats[7]}% -> ${midpointStats[p8.id].percent}%`}
                );

                if(!totalDrafts["midpoint"]) {
                    totalDrafts["midpoint"] = {
                        name: "midpoint",
                        allDrafts: 1
                    }
                }
                else totalDrafts["midpoint"].allDrafts += parseInt(1);
                fs.writeFile('./totalDrafts.json', JSON.stringify(totalDrafts), (err) => { if (err) console.log(err)});
            break;
            default:
                return message.reply('Usage: `mp!report [public | mp] <player 1> <player 2> <player 3> <player 4> <score (X-Y)> <player 5> <player 6> <player 7> <player 8>`');

        }
        return message.channel.send({embeds: [Reply]});
    }
}

const Clamp = (num, min, max) => Math.max(min,Math.min(max,num));