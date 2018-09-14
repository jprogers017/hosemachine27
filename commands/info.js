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
    let serverEmbed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor("#7fc0ff")
        .addField("Server Owner", message.guild.owner, true)
        .addField("Total Members", message.guild.memberCount, true)
        .addField("Created On", message.guild.createdAt, true)
        .addField("Your Nickname", message.member.nickname, true)
        .addField("Highest Role", message.member.highestRole, true)
        .addField("You joined", message.member.joinedAt, true);

    //set embeds
    help.setTitle(exports.help.usage);
    help.setDescription(exports.help.description);

    //command
    if (args[0] === "?") {
        logContent = `<@${message.member.id}> asked for help with the server info :)`;
        message.channel.send(help);
    } else if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> asked for the server information!`;
        message.channel.send(serverEmbed);
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
    name: `${prefix}info`,
    description: `sends information about the server`,
    type: `member`,
    usage: `${prefix}info, ${prefix}info [?]`
}