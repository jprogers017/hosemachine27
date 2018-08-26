const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    if (!logsChannel) {
        message.channel.send(`u gotta ping jackie first, <@!200837857214988298>`);
    } else {
        message.channel.send(`u gotta ping jackie first, <@!200837857214988298>`);
        return logsChannel.send(`<@${message.member.id}> told jackie to suck their dick`);
    }

}

module.exports.help = {
    name: ";)suckmydick"
}