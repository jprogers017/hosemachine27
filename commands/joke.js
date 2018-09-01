const Discord = require("discord.js");
const fs = require("fs");
const oneLinerJoke = require('one-liner-joke');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    const logContent = `<@${message.member.id}> asked for a one-liner joke!`;

    var randomJoke = oneLinerJoke.getRandomJoke();
    let jokeEmbed = new Discord.RichEmbed()
        .setAuthor(`joke's source (click on me)`, `https://hackadaycom.files.wordpress.com/2018/06/git1_logo1.png`, 'https://github.com/faiyaz26/one-liner-joke')
        .setColor('#73b6ff')
        .setDescription(`${randomJoke.body}`)
        .setTimestamp();
    message.channel.send(jokeEmbed).catch(error => {
        console.log(error);
    });

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

module.exports.help = {
    name: `${prefix}joke`,
    description: `sends a random one-liner joke!`,
    type: `member`,
    usage: `${prefix}joke, ${prefix}joke [?]`
}