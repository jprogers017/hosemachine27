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
    if (!message.guild) {
        return;
    } else if (!message.member.hasPermission("ADMINISTRATOR")) {
        logContent = `<@${message.member.id}> tried to use ${exports.help.name}, but doesnt have admin perms :(`;
        message.channel.send("lmao, u dont have perms for that");
    } else if (!args[0]) {
        message.channel.send("yo, u cant clear 0 messages");
    } else if ((message.member.hasPermission("ADMINISTRATOR")) && (args[0])) {
        logContent = `<@${message.member.id}> cleared ${args[0]} messages`;
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`cleared ${args[0]} messages, yikes`).then(msg => msg.delete(2500));
        });
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
    name: `${prefix}purge`,
    description: `ADMINISTRATOR PERMISSIONS REQUIRED\npurges a set set of messages`,
    type: `admin`,
    usage: `${prefix}purge <number of messages>, ${prefix}purge [?]`
}