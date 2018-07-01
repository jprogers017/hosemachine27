const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        let botIcon = client.user.displayAvatarURL;
        let aHelpEmbed = new Discord.RichEmbed()
            .setTitle("hosemachine (27) help info :)")
            .setDescription("use the ;) prefix")
            .setColor("#7fc0ff")
            .setThumbnail(botIcon)
            .addField("Commands", "do ;)commands", true)
            .addField("Other Features", "swear filter!!!\nsometimes words r actually emojis\nsometimes bot will yell things at u", true)
            .addField("Code, if u want it lol", "https://goo.gl/rua7h6")
            .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

        message.channel.send(aHelpEmbed);
    } else {
        let botIcon = client.user.displayAvatarURL;
        let aHelpEmbed = new Discord.RichEmbed()
            .setTitle("hosemachine (27) help info :)")
            .setDescription("use the ;) prefix")
            .setColor("#7fc0ff")
            .setThumbnail(botIcon)
            .addField("Commands", "do ;)commands", true)
            .addField("Other Features", "swear filter!!!\nsometimes words r actually emojis\nsometimes bot will yell things at u", true)
            .addField("Code, if u want it lol", "https://goo.gl/rua7h6")
            .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

        message.channel.send(aHelpEmbed);
        return logsChannel.send(`**${message.member.displayName}** needed help`);
    }
}

module.exports.help = {
    name: "help"
}