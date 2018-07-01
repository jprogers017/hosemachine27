const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        message.channel.send("Hello!!!");
    } else {
        message.channel.send("Hello!!!");
        return logsChannel.send(`**${message.member.displayName}** said hello!!!`);
    }
}

module.exports.help = {
    name: "hello"
}