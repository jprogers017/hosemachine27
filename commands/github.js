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
    let gitEmbed = new Discord.RichEmbed()
        .setAuthor(`jprogers017 (click here!!!)`, `https://cdn.discordapp.com/avatars/419784267506384906/1739f48f8e8e3e5a679772274b230fd1.png?size=2048`, `https://github.com/jprogers017/hosemachine27`)

    //command
    if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> asked for my github link!`;
        message.channel.send(gitEmbed);
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
    name: `${prefix}github`,
    description: `heres a link for my github page!`,
    type: `member`,
    usage: `${prefix}github, ${prefix}github [?]`
}