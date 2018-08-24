const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        let kinkshamedUser = message.mentions.members.first();
        message.channel.send(`${kinkshamedUser}, should i be kinkshaming u? i think i should`);
    } else {
        let kinkshamedUser = message.mentions.members.first();
        message.channel.send(`${kinkshamedUser}, should i be kinkshaming u? i think i should`);
        return logsChannel.send(`**${message.member.displayName}** had ${kinkshamedUser} kinkshamed`);
    }
}

module.exports.help = {
    name: ";)kinkshame"
}