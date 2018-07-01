const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        let commandEmbed = new Discord.RichEmbed()
            .setTitle("# joke commands BOIII")
            .setColor("#7fc0ff")
            .addField("Auto Reply", "its all apart of the game...u will not know what elicits an auto reply unless u say one of them ;)", true)
            .addField("Fake Filter", "heck\nfrick\ndarn\nbinch", true)
            .addField("Reacts", "gay\neyes emoji\nwet\n", true)
            .addField("Commands", "suckmydick\nkinkshame", true)

        message.channel.send(commandEmbed);
    } else {
        let commandEmbed = new Discord.RichEmbed()
            .setTitle("# joke commands BOIII")
            .setColor("#7fc0ff")
            .addField("Auto Reply", "its all apart of the game...u will not know what elicits an auto reply unless u say one of them ;)", true)
            .addField("Fake Filter", "heck\nfrick\ndarn\nbinch", true)
            .addField("Reacts", "gay\neyes emoji\nwet\n", true)
            .addField("Commands", "suckmydick\nkinkshame", true)

        message.channel.send(commandEmbed);
        return logsChannel.send(`**${message.member.displayName}** asked for the joke commands not in "help"`);
    }

}

module.exports.help = {
    name: "commands"
}