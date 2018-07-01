const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    var eightBallReplies = [
        "It is certain",
        "It is decidely so",
        "Without a doubt",
        "Yes, definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Signs point to yes",
        "Yes",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Maybe",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful",
        "No"
    ];

    if (!logsChannel) {
        if (!args[1]) {
            message.reply("more than a one worded question");
            return logsChannel.send(`**${message.member.displayName}** tried to ask a question??? i think???`);
        } else {
            let eightBallResult = Math.floor((Math.random() * eightBallReplies.length));
            let eightBallQuestion = args.slice(1).join(" ");

            message.reply(eightBallReplies[eightBallResult]);
        }
    } else {
        if (!args[1]) {
            message.reply("more than a one worded question");
            return logsChannel.send(`**${message.member.displayName}** tried to ask a question??? i think???`);
        } else {
            let eightBallResult = Math.floor((Math.random() * eightBallReplies.length));
            let eightBallQuestion = args.slice(1).join(" ");

            message.reply(eightBallReplies[eightBallResult]);
            return logsChannel.send(`**${message.member.displayName}** asked the 8ball ${eightBallQuestion}`);
        }
    }
}

module.exports.help = {
    name: "8ball"
}