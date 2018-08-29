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
    const logContent = `<@${message.member.id}> asked for the admin commands`;

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("u dont have perms for that, sorry");
    } else {
        let botIcon = client.user.displayAvatarURL;
        let commandEmbed = new Discord.RichEmbed()
            .setTitle(`${client.user.name} admin commands :)`)
            .setDescription("you need a role with admin perms turned on")
            .setColor("#7fc0ff")
            .setThumbnail(botIcon)
            .addField("Working Commands", "purge\nsay", true)
            .addField("Broken Commands", "nothing...yet", true)
            .addField("Coming Soon", "i have absolutely no idea", true)
            .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

        message.channel.send(commandEmbed);
    }

    if (message.guild.id == myServerID) {
        let logsEmbed = new Discord.RichEmbed()
            .setDescription(logContent)
            .addField('channel:', message.channel.name)
            .setColor(message.member.displayHexColor)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp();

        serverLogs.send(logsEmbed);
    } else {
        let logsEmbed = new Discord.RichEmbed()
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
    name: `${prefix}admin`
}