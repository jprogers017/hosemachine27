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
        return serverLogs.send(`<@${message.member.id}> asked for the admin commands`);
    } else {
        return externalLogs.send(`<@${message.member.id}> asked for the admin commands\n**SERVER**: *${message.guild.name}* || **CHANNEL**: ${message.channel.name} || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}admin`
}