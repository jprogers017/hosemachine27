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
    const logContent = `<@${message.member.id}> is PROBABLY being kinkshamed!`;

    let kinkshamedUser = message.mentions.members.first();
    if (kinkshamedUser == undefined) {
        return message.reply(`who am i kinkshaming?`).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.send(`${kinkshamedUser}, should i be kinkshaming u? i think i should`).catch(error => {
            console.log(error);
        });
    }

    let logsEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();
    if (message.guild.id == config.myServerID) {
        serverLogs.send(logsEmbed);
    } else {
        logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        externalLogs.send(logsEmbed);
    }
}

module.exports.help = {
    name: `${prefix}kinkshame`,
    description: `kinkshames the tagged user`,
    type: `member`,
    usage: `${prefix}kinkshame <user>, ${prefix}kinkshame [?]`
}