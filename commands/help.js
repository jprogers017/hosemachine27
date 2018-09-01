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
    const logContent = `<@${message.member.id}> asked for help!`;

    let msg = `__**usage: ${prefix}command *<required>, [optional]***__`;
    client.commands.forEach(c => {
        msg = msg + `\n**${c.help.name}** || usage: ${c.help.usage}\n${c.help.description}`;
    });

    if (message.member.nickname) {
        var authorName = message.member.nickname;
    } else {
        var authorName = message.author.username;
    }
    let helpEmbed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username}'s help page! u need help, ${authorName}?`, message.author.avatarURL)
        .setDescription(msg)
        .setColor(message.member.displayHexColor)
        .setFooter(`UNDER CONSTRUCTION: for command specific help, do the command with "?" afterwards, for example, ${prefix}hello ?`);
    message.channel.send(helpEmbed).catch(error => {
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
    name: `${prefix}help`,
    description: `shows the list of all the commands`,
    type: `member`,
    usage: `${prefix}help`
}