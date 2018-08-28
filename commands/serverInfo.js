const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    let serverIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
        .setTitle("Server Information")
        .setColor("#7fc0ff")
        .setThumbnail(serverIcon)
        .addField("Server Name", message.guild.name, true)
        .addField("Server Owner", message.guild.owner, true)
        .addField("Total Members", message.guild.memberCount, true)
        .addField("Created On", message.guild.createdAt, true)
        .addField("You joined", message.member.joinedAt, true);

    message.channel.send(serverEmbed);

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> asked for the server information`);
    } else {
        return externalLogs.send(`<@${message.member.id}> asked for the server information\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}server`
}