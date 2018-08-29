const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args) => {
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

    if (!args[1]) {
        message.reply("more than a one worded question");
    } else {
        let eightBallResult = Math.floor((Math.random() * eightBallReplies.length));
        let eightBallQuestion = args.slice(1).join(" ");
        message.reply(eightBallReplies[eightBallResult]);

        if (message.guild.id == myServerID) {
            return serverLogs.send(`<@${message.member.id}> asked for guidance from the 8 ball`);
        } else {
            return externalLogs.send(`<@${message.member.id}> asked for guidance from the 8 ball\n**SERVER**: *${message.guild.name}* || **CHANNEL**: ${message.channel.name} || **OWNED BY**: ${message.guild.owner}`);
        }
    }
}

module.exports.help = {
    name: `${prefix}8ball`
}