const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, logsEmbed) => {
    //variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    var logContent;
    var chance = Math.floor(Math.random() * 2);

    //command
    if (!message.guild) {
        return;
    } else if (chance == 0) {
        logContent = `<@${message.member.id}> flipped a coin and got heads!`;
        message.reply(`heads`);
    } else {
        logContent = `<@${message.member.id}> flipped a coin and got tails!`;
        message.reply(`tails`);
    }

    //logs
    logsEmbed.setDescription(logContent);
    if (message.guild.id == config.myServerID) {
        return serverLogs.send(logsEmbed);
    } else {
        logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true);
        return externalLogs.send(logsEmbed);
    }
}

module.exports.help = {
    name: `${prefix}coinflip`,
    description: `flips a coin for u, assuming u did the command because u dont have a coin`,
    type: `member`,
    usage: `${prefix}coinflip, ${prefix}coinflip [?]`
}