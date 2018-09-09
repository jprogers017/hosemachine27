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

    var roll = Math.floor(Math.random() * 100) + 1;
    if (roll <= 1) {
        message.reply(`${roll}, ouch`).catch(error => {
            console.log(error);
        });
    } else if (roll >= 2 && roll <= 19) {
        message.reply(`${roll}, yikes, better luck next time`).catch(error => {
            console.log(error);
        });
    } else if (roll >= 20 && roll <= 39) {
        message.reply(`${roll}, ehhh, couldve been better`).catch(error => {
            console.log(error);
        });
    } else if (roll >= 40 && roll <= 59) {
        message.reply(`${roll}, not too bad`).catch(error => {
            console.log(error);
        });
    } else if (roll >= 60 && roll <= 79) {
        message.reply(`${roll}, NOW we're getting somewhere`);
    } else if (roll >= 80 && roll <= 99) {
        message.reply(`${roll}, god damn`).catch(error => {
            console.log(error);
        });
    } else {
        message.reply(`${roll} how'd u do that? did u hack me???`).catch(error => {
            console.log(error);
        });
    }

    const logContent = `<@${message.member.id}> rolled a ${roll}`;
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
    name: `${prefix}roll`,
    description: `rolls a number between 1 and 100`,
    type: `member`,
    usage: `${prefix}roll, ${prefix}roll [?]`
}