const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, authorName, logsEmbed) => {
    //variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    var logContent;
    let inviteEmbed = new Discord.RichEmbed()
        .setAuthor(authorName, message.author.avatarURL)
        .setDescription(`here u go!!!\n<https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot>`)
        .setColor(`#73b6ff`)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

    //command
    if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> asked for my invite link!`;
        message.channel.send(inviteEmbed);
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
    name: `${prefix}invite`,
    description: `gets u a link to invite the bot to ur server`,
    type: `member`,
    usage: `${prefix}invite, ${prefix}invite [?]`
}