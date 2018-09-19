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
    const botMessage = args.join(" ");

    //command
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        logContent = `<@${message.member.id}> tried to use ${exports.help.name}, but doesnt have admin perms :(`;
        message.reply("no perms for that!!! sorry!!!");
    } else if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> just had me say "${botMessage}" in <#${message.channel.id}>`;
        message.delete().catch();
        message.channel.send(botMessage);
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
    name: `${prefix}say`,
    description: `ADMINISTRATOR PERMISSIONS REQUIRED\nhas the bot repeat after u`,
    type: `admin`,
    usage: `${prefix}say <message>, ${prefix}say [?]`
}