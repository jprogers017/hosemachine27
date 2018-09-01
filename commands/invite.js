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
    const logContent = `<@${message.member.id}> my invite link!`;

    if (message.member.nickname) {
        var authorName = message.member.nickname;
    } else {
        var authorName = message.author.username;
    }
    let inviteEmbed = new Discord.RichEmbed()
        .setAuthor(authorName, message.author.avatarURL)
        .setDescription(`here u go!!!\n<https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot>`)
        .setColor(`#73b6ff`)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

    message.channel.send(inviteEmbed).catch(error => {
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
    name: `${prefix}invite`,
    description: `gets u a link to invite the bot to ur server`,
    type: `member`,
    usage: `${prefix}invite, ${prefix}invite [?]`
}