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

                var oldPercentage1;
                var oldPercentage2;
                var oldPercentage3;
                var oldPercentage4;
                var oldPercentage5;
                var oldPercentage6;
                var oldPercentage7;
                var oldPercentage8;

                var newPer1;
                var newPer2;
                var newPer3;
                var newPer4;
                var newPer5;
                var newPer6;
                var newPer7;
                var newPer8;

                oldStats[0] > 100.0 ? oldPercentage1 = 100.0 : oldPercentage1 = oldStats[0];
                oldStats[1] > 100.0 ? oldPercentage2 = 100.0 : oldPercentage2 = oldStats[1];
                oldStats[2] > 100.0 ? oldPercentage3 = 100.0 : oldPercentage3 = oldStats[2];
                oldStats[3] > 100.0 ? oldPercentage4 = 100.0 : oldPercentage4 = oldStats[3];
                oldStats[4] > 100.0 ? oldPercentage5 = 100.0 : oldPercentage5 = oldStats[4];
                oldStats[5] > 100.0 ? oldPercentage6 = 100.0 : oldPercentage6 = oldStats[5];
                oldStats[6] > 100.0 ? oldPercentage7 = 100.0 : oldPercentage7 = oldStats[6];
                oldStats[7] > 100.0 ? oldPercentage8 = 100.0 : oldPercentage8 = oldStats[7];
                
                publicStats[p1.id].percent > 100.0 ? newPer1 = 100.0 : newPer1 = publicStats[p1.id].percent;
                publicStats[p2.id].percent > 100.0 ? newPer2 = 100.0 : newPer2 = publicStats[p2.id].percent;
                publicStats[p3.id].percent > 100.0 ? newPer3 = 100.0 : newPer3 = publicStats[p3.id].percent;
                publicStats[p4.id].percent > 100.0 ? newPer4 = 100.0 : newPer4 = publicStats[p4.id].percent;
                publicStats[p5.id].percent > 100.0 ? newPer5 = 100.0 : newPer5 = publicStats[p5.id].percent;
                publicStats[p6.id].percent > 100.0 ? newPer6 = 100.0 : newPer6 = publicStats[p6.id].percent;
                publicStats[p7.id].percent > 100.0 ? newPer7 = 100.0 : newPer7 = publicStats[p7.id].percent;
                publicStats[p8.id].percent > 100.0 ? newPer8 = 100.0 : newPer8 = publicStats[p8.id].percent;

                Reply
                .setColor('Blue')
                .setTitle('Draft Results')
                .addFields(
                    { name: 'Team Alpha', value: `${p1.tag}: ${oldPercentage1}% -> ${newPer1}%\n${p2.tag}: ${oldPercentage2}% -> ${newPer2}%\n${p3.tag}: ${oldPercentage3}% -> ${newPer3}%\n${p4.tag}: ${oldPercentage4}% -> ${newPer4}%`},
                    { name: 'Team Beta', value: `${p5.tag}: ${oldPercentage5}% -> ${newPer5}%\n${p6.tag}: ${oldPercentage6}% -> ${newPer6}%\n${p7.tag}: ${oldPercentage7}% -> ${newPer7}%\n${p8.tag}: ${oldPercentage8}% -> ${newPer8}%`}
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
                        midpointStats[players[i].id].percent = finalPercentage;
                        
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
                        midpointStats[players[i].id].percent = finalPercentage;
                        
                        fs.writeFile('./midpointStats.json', JSON.stringify(midpointStats), (err) => { if (err) console.log(err)});
                    }
                }

                var oldPercentage1;
                var oldPercentage2;
                var oldPercentage3;
                var oldPercentage4;
                var oldPercentage5;
                var oldPercentage6;
                var oldPercentage7;
                var oldPercentage8;

                var newPer1;
                var newPer2;
                var newPer3;
                var newPer4;
                var newPer5;
                var newPer6;
                var newPer7;
                var newPer8;

                oldStats[0] > 100.0 ? oldPercentage1 = 100.0 : oldPercentage1 = oldStats[0];
                oldStats[1] > 100.0 ? oldPercentage2 = 100.0 : oldPercentage2 = oldStats[1];
                oldStats[2] > 100.0 ? oldPercentage3 = 100.0 : oldPercentage3 = oldStats[2];
                oldStats[3] > 100.0 ? oldPercentage4 = 100.0 : oldPercentage4 = oldStats[3];
                oldStats[4] > 100.0 ? oldPercentage5 = 100.0 : oldPercentage5 = oldStats[4];
                oldStats[5] > 100.0 ? oldPercentage6 = 100.0 : oldPercentage6 = oldStats[5];
                oldStats[6] > 100.0 ? oldPercentage7 = 100.0 : oldPercentage7 = oldStats[6];
                oldStats[7] > 100.0 ? oldPercentage8 = 100.0 : oldPercentage8 = oldStats[7];

                midpointStats[p1.id].percent > 100.0 ? newPer1 = 100.0 : newPer1 = midpointStats[p1.id].percent;
                midpointStats[p2.id].percent > 100.0 ? newPer2 = 100.0 : newPer2 = midpointStats[p2.id].percent;
                midpointStats[p3.id].percent > 100.0 ? newPer3 = 100.0 : newPer3 = midpointStats[p3.id].percent;
                midpointStats[p4.id].percent > 100.0 ? newPer4 = 100.0 : newPer4 = midpointStats[p4.id].percent;
                midpointStats[p5.id].percent > 100.0 ? newPer5 = 100.0 : newPer5 = midpointStats[p5.id].percent;
                midpointStats[p6.id].percent > 100.0 ? newPer6 = 100.0 : newPer6 = midpointStats[p6.id].percent;
                midpointStats[p7.id].percent > 100.0 ? newPer7 = 100.0 : newPer7 = midpointStats[p7.id].percent;
                midpointStats[p8.id].percent > 100.0 ? newPer8 = 100.0 : newPer8 = midpointStats[p8.id].percent;

                Reply
                .setColor('Blue')
                .setTitle('Draft Results')
                .addFields(
                    { name: 'Team Alpha', value: `${p1.tag}: ${oldPercentage1}% -> ${newPer1}%\n${p2.tag}: ${oldPercentage2}% -> ${newPer2}%\n${p3.tag}: ${oldPercentage3}% -> ${newPer3}%\n${p4.tag}: ${oldPercentage4}% -> ${newPer4}%`},
                    { name: 'Team Beta', value: `${p5.tag}: ${oldPercentage5}% -> ${newPer5}%\n${p6.tag}: ${oldPercentage6}% -> ${newPer6}%\n${p7.tag}: ${oldPercentage7}% -> ${newPer7}%\n${p8.tag}: ${oldPercentage8}% -> ${newPer8}%`}
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