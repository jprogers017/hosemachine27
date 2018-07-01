const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply("no perms 4 that, fucker");
            return logsChannel.send(`**${message.member.displayName}** tried to say ${botMessage} but doesnt have perms`);
        }
        let botMessage = args.join(" ");
        message.delete().catch();

        message.channel.send(botMessage);
    } else {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply("no perms 4 that, fucker");
            return logsChannel.send(`**${message.member.displayName}** tried to say ${botMessage} but doesnt have perms`);
        }
        let botMessage = args.join(" ");
        message.delete().catch();

        message.channel.send(botMessage);
        return logsChannel.send(`**${message.member.displayName}** told hosemachine (27) to say *${botMessage}*`);
    }
}

module.exports.help = {
    name: "say"
}