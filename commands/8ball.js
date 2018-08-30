const Discord = require("discord.js");
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
        let eightBallQuestion = args.slice().join(" ");
        message.reply(eightBallReplies[eightBallResult]);
        const logContent = `<@${message.member.id}> asked the magic 8 ball "${eightBallQuestion}"`;

        if (message.guild.id == myServerID) {
            let logsEmbed = new Discord.RichEmbed()
                .setAuthor(client.user.username, client.user.avatarURL)
                .setDescription(logContent)
                .addField('channel:', message.channel.name)
                .setColor(message.member.displayHexColor)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp();
    
            serverLogs.send(logsEmbed);
        } else {
            let logsEmbed = new Discord.RichEmbed()
                .setAuthor(client.user.username, client.user.avatarURL)
                .setDescription(logContent)
                .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
                .addField('channel:', message.channel.name, true)
                .setColor(message.member.displayHexColor)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp();
    
            externalLogs.send(logsEmbed);
        }
    }
}

module.exports.help = {
    name: `${prefix}8ball`,
    description: `ask the magic 8 ball for some guidance`,
    type: `member`,
    usage: `${prefix}8ball <question>`
}