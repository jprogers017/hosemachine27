const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    return message.channel.send("not working atm, sorry");

    // if (!logsChannel) {
    //     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    //         message.reply("lmao, u dont have perms for that. stupid bitch");
    //         return logsChannel.send(`lmao, **${message.member.displayName}** asked for admin commands, but doesnt have admin perms? fuckin loser`);
    //     };
    //     let botIcon = client.user.displayAvatarURL;
    //     let helpEmbed = new Discord.RichEmbed()
    //         .setTitle("Admin Help")
    //         .setDescription("u need admin perms 4 this shit")
    //         .setColor("#7fc0ff")
    //         .setThumbnail(botIcon)
    //         .addField("Commands", "say", true)
    //         .addField("Other shit?", "nothing yet, lmao", true)
    //         .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

    //     message.channel.send(helpEmbed);
    // } else {
    //     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    //         message.reply("lmao, u dont have perms for that. stupid bitch");
    //         return logsChannel.send(`lmao, **${message.member.displayName}** asked for admin commands, but doesnt have admin perms? fuckin loser`);
    //     };
    //     let botIcon = client.user.displayAvatarURL;
    //     let helpEmbed = new Discord.RichEmbed()
    //         .setTitle("Admin Help")
    //         .setDescription("u need admin perms 4 this shit")
    //         .setColor("#7fc0ff")
    //         .setThumbnail(botIcon)
    //         .addField("Commands", "say", true)
    //         .addField("Other shit?", "nothing yet, lmao", true)
    //         .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

    //     message.channel.send(helpEmbed);
    //     return logsChannel.send(`**${message.member.displayName}** needed admin help`);
    // }
}

module.exports.help = {
    name: "adminhelp"
}