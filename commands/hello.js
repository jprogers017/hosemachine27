const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, authorName, logsEmbed, help) => {
    //variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    var logContent;

    //set embeds
    help.setTitle(exports.help.usage);
    help.setDescription(exports.help.description);

    //command
    if (args[0] === "?") {
        logContent = `${message.author.tag} asked for help with hello :)`;
        message.channel.send(help);
    } else if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> said hello!)`;
        message.channel.send(`hello, ${authorName}!!!`);
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
    name: `${prefix}hello`,
    description: `say hello!`,
    usage: `${prefix}hello, ${prefix}hello [?]`
}