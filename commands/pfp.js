const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        message.reply(message.author.avatarURL);
    } else {
        message.reply(message.author.avatarURL);
        return logsChannel.send(`<@${message.member.id}> asked for their pfp`);
    }
}

module.exports.help = {
    name: ";)pfp"
}