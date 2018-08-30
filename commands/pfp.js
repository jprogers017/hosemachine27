const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    const logContent = `<@${message.member.id}> asked to see their profile picture`;

    message.reply(message.author.avatarURL);

    if (message.guild.id == myServerID) {
        let logsEmbed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription(logContent)
            .addField('channel:', message.channel.name)
            .setColor(message.member.displayHexColor)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp();

        serverLogs.send(logsEmbed);
    } else {
        let logsEmbed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription(logContent)
            .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
            .addField('channel:', message.channel.name, true)
            .setColor(message.member.displayHexColor)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp();

        externalLogs.send(logsEmbed);
    }
}

module.exports.help = {
    name: `${prefix}pfp`,
    description: `sends ur profile pic into chat, or whoever u tagged afterwards`,
    type: `member`,
    usage: `${prefix}pfp [user]`
}