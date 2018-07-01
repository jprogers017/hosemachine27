const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        let serverIcon = message.guild.iconURL;
        let serverEmbed = new Discord.RichEmbed()
            .setTitle("Server Information")
            .setColor("#7fc0ff")
            .setThumbnail(serverIcon)
            .addField("Server Name", message.guild.name, true)
            .addField("Total Members", message.guild.memberCount, true)
            .addField("Created On", message.guild.createdAt, true)
            .addField("You joined", message.member.joinedAt, true);

        message.channel.send(serverEmbed);
    } else {
        let serverIcon = message.guild.iconURL;
        let serverEmbed = new Discord.RichEmbed()
            .setTitle("Server Information")
            .setColor("#7fc0ff")
            .setThumbnail(serverIcon)
            .addField("Server Name", message.guild.name, true)
            .addField("Total Members", message.guild.memberCount, true)
            .addField("Created On", message.guild.createdAt, true)
            .addField("You joined", message.member.joinedAt, true);

        message.channel.send(serverEmbed);
        return logsChannel.send(`**${message.member.displayName}** asked for server info`);
    }
}

module.exports.help = {
    name: "serverinfo"
}