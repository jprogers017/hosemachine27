const Discord = require("discord.js");
const fs = require("fs");
const oneLinerJoke = require('one-liner-joke');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, authorName, logsEmbed, help) => {
    //variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    var logContent;
    var randomJoke = oneLinerJoke.getRandomJoke();
    var rand = randomJoke.body;
    let jokeEmbed = new Discord.RichEmbed()
        .setAuthor(`one-liner jokes github (click on me)`, `https://hackadaycom.files.wordpress.com/2018/06/git1_logo1.png`, 'https://github.com/faiyaz26/one-liner-joke')
        .setColor('#73b6ff')
        .setDescription(`${rand}`);

    //set embeds
    help.setTitle(exports.help.usage);
    help.setDescription(exports.help.description);

    //command
    if (args[0] === "?") {
        logContent = `<@${message.member.id}> asked for help with a one-liner joke :)`;
        message.channel.send(help);
    } else if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> asked for a one-liner joke!\n**${rand}**`;
        message.channel.send(jokeEmbed).catch;
    }

    //logs
    logsEmbed.setDescription(logContent);
    if (message.guild.id == config.myServerID) {
        return serverLogs.send(logsEmbed);
    } else {
        logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        return externalLogs.send(logsEmbed);
    }
}

module.exports.help = {
    name: `${prefix}joke`,
    description: `sends a random one-liner joke!`,
    type: `member`,
    usage: `${prefix}joke, ${prefix}joke [?]`
}