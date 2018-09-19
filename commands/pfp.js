const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, authorName, logsEmbed) => {
    //variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    var logContent;
    var mentionedUser = message.guild.members.get(message.mentions.members.first());

    //command
    if (!message.guild) {
        return;
    } else if (!mentionedUser) {
        logContent = `<@${message.member.id}> asked to see their profile picture!`;
        message.channel.send(message.author.avatarURL);
    } else {
        logContent = `<@${message.member.id}> asked to see ${mentionedUser}'s profile picture!`;
        message.channel.send(mentionedUser.avatarURL);
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
    name: `${prefix}pfp`,
    description: `sends ur profile picture into chat, or whoever u mentioned's profile picture...but right now it only sends ur own, sorry lol`,
    type: `member`,
    usage: `${prefix}pfp [user], ${prefix}pfp [?]`
}