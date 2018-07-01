const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        let requestPic = client.user.displayAvatarURL;
        let requestEmbed = new Discord.RichEmbed()
            .setTitle("uh? requests? can u read?")
            .setDescription("give me suggetions to make my bot better")
            .addField("literally just dm me, lmfao", "Josephine#6301")
            .setColor("#7fc0ff")
            .setThumbnail(requestPic)
        message.channel.send(requestEmbed);
    } else {
        let requestPic = client.user.displayAvatarURL;
        let requestEmbed = new Discord.RichEmbed()
            .setTitle("uh? requests? can u read?")
            .setDescription("give me suggetions to make my bot better")
            .addField("literally just dm me, lmfao", "Josephine#6301")
            .setColor("#7fc0ff")
            .setThumbnail(requestPic)
        message.channel.send(requestEmbed);
        return logsChannel.send(`**${message.member.displayName}** sent in a request? maybe? idk if they followed thru lmfao`);
    }
}

module.exports.help = {
    name: "request"
}