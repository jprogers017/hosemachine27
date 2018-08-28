const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    let commandEmbed = new Discord.RichEmbed()
        .setTitle(`${client.user.name} commands :)`)
        .setDescription(`anyone can do these! use the ${prefix} prefix`)
        .setColor("#7fc0ff")
        .addField("Auto Reply", "its all apart of the game...u will not know what elicits an auto reply unless u say one of them ;)", true)
        .addField("Filter", "same as the auto-reply stuff, u wont know until u try :)", true)
        .addField("Reactions", "some words trigger emojis that i thought matched. but theyre a secret...u have to say them to find out", true)
        .addField("Commands", "8ball\ncoinflip\ncowjoke\ndadjoke\nhello\nknock\nmeme\npfp\nping\npuppy\nrequest\nroll\nserver\nvine", true)

    message.channel.send(commandEmbed);

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> asked for the commands`);
    } else {
        return externalLogs.send(`<@${message.member.id}> asked for the commands\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}commands`
}