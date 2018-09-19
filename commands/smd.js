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

    //command
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        logContent = `<@${message.member.id}> tried to use ${exports.help.name}, but doesnt have admin perms :(`;
        message.reply("u cant say that to jackie :(");
    } else if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> told <@!200837857214988298> to suck their dick`;
        message.channel.send(`<@!200837857214988298>, suck my dick`);
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
    name: `${prefix}smd`,
    description: `ADMINISTRATOR PERMISSIONS REQUIRED\ntells ninjackoff peeno to suck ur dick`,
    type: `admin`,
    usage: `${prefix}smd, ${prefix}smd [?]`
}