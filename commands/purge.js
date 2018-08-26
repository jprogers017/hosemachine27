const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    return message.channel.send("not working atm, sorry");

    // if (!logsChannel) {
    //     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    //         message.reply("lmao, u dont have perms for that. stupid bitch");
    //         return logsChannel.send(`lmao, <@${message.member.id}> purged ${args[0]} messages, but doesnt have perms for it`);
    //     };
    //     if (!args[0]) {
    //         message.channel.send("yo, u cant clear 0 messages, dumb fuck");
    //         return logsChannel.send(`<@${message.member.id}> tried purging nothing? ok`);
    //     };
    //     message.channel.bulkDelete(args[0]).then(() => {
    //         message.channel.send(`cleared ${args[0]} messages, yikes`).then(msg => msg.delete(1500));
    //     });
    // } else {
    //     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    //         message.reply("lmao, u dont have perms for that. stupid bitch");
    //         return logsChannel.send(`lmao, <@${message.member.id}> purged ${args[0]} messages, but doesnt have perms for it`);
    //     };
    //     if (!args[0]) {
    //         message.channel.send("yo, u cant clear 0 messages, dumb fuck");
    //         return logsChannel.send(`<@${message.member.id}> tried purging nothing? ok`);
    //     };
    //     message.channel.bulkDelete(args[0]).then(() => {
    //         message.channel.send(`cleared ${args[0]} messages, yikes`).then(msg => msg.delete(1500));
    //     });
    //     return logsChannel.send(`<@${message.member.id}> purged ${args[0]} messages`);
    // }
}

module.exports.help = {
    name: ";)purge"
}