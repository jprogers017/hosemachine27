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
    let kinkshamedUser = message.mentions.members.first();

    //command
    if (!message.guild) {
        return;
    } else if (kinkshamedUser == undefined) {
        logContent = `<@${message.member.id}> is trying to kinkshame somebody? i am not sure who :(`;
        message.reply(`who am i kinkshaming?`);
    } else {
        logContent = `<@${kinkshamedUser}> is being kinkshamed!`;
        message.channel.send(`${kinkshamedUser}, should i be kinkshaming u? i think i should`);
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
    name: `${prefix}kinkshame`,
    description: `kinkshames the tagged user`,
    type: `member`,
    usage: `${prefix}kinkshame <user>, ${prefix}kinkshame [?]`
}