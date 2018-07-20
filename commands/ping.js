const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        message.channel.send(`hi, it took me ${((new Date().getTime() - message.createdTimestamp) * -1)}ms to respond to u`);
    } else {
        message.channel.send(`hi, it took me ${((new Date().getTime() - message.createdTimestamp) * -1)}ms to respond to u`);
        return logsChannel.send(`**${message.member.displayName}** used ping, it took ${((new Date().getTime() - message.createdTimestamp) * -1)}  ms to respond`);
    }
}

module.exports.help = {
    name: "ping"
}