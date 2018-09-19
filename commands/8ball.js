const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, logsEmbed) => {
    //variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
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
    var eightBallQuestion = args.slice().join(" ");
    var eightBallResults = Math.floor((Math.random() * eightBallReplies.length));
    var eightBallAnswer = eightBallReplies[eightBallResults];
    var logContent;

    //command
    if (!message.guild) {
        return;
    } else if (!args[0]) {
        logContent = `<@${message.member.id}> tried to use the magic 8 ball, but...with no question?`;
        message.channel.send("did u have a question? or...");
    } else if (!args[1]) {
        logContent = `<@${message.member.id}> tried to use the magic 8 ball, but their question was too short`;
        message.channel.send("more than a one worded question, please");
    } else {
        logContent = `<@${message.member.id}> used the magic 8 ball!\n**${eightBallQuestion}**\n${eightBallAnswer}`;
        message.channel.send(eightBallAnswer);
    }

    //logs
    logsEmbed.setDescription(logContent);
    if (message.guild.id == config.myServerID) {
        return serverLogs.send(logsEmbed);
    } else {
        logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true);
        return externalLogs.send(logsEmbed);
    }
}

module.exports.help = {
    name: `${prefix}8ball`,
    description: `ask the magic 8 ball for some guidance`,
    type: `member`,
    usage: `${prefix}8ball <question>, ${prefix}8ball [?]`
}