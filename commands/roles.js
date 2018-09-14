const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, authorName, logsEmbed, help) => {
    // variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    var logContent;

    //set embeds
    help.addField(exports.help.description, `just go to <#${config.rolesChannel}> and react with what games u either play or own, but its up to u`);
    help.setFooter(`this shit is broken right now, havent gotten around to fixing it because i keep getting distracted with other things wrong with this bot :)`);

    //command
    if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> asked how roles work :)`;
        message.channel.send(help);
    }

    //logs
    logsEmbed.setDescription(logContent);
    if (message.guild.id == config.myServerID) {
        return serverLogs.send(logsEmbed);
    } else {
        logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        return externalLogs.send(logsEmbed);
    }
}

module.exports.help = {
    name: `${prefix}roles`,
    description: `how to self assign ur roles!`,
    type: `member`,
    usage: `${prefix}roles`
}