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

    if (message.member.nickname) {
        var authorName = message.member.nickname;
    } else {
        var authorName = message.author.username;
    }
    let helpEmbed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username}'s help page! u need help, ${authorName}?`, message.author.avatarURL, 'https://github.com/jprogers017/hosemachine27')
        .setTitle(`usage: ${prefix}command *<required>, [optional]*`)
        .setDescription(`[click here for my github!](https://github.com/jprogers017/hosemachine27)\n[click here for my server invitation link!](https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot)`)
        .setColor(message.member.displayHexColor)
        .setFooter(`UNDER CONSTRUCTION: for command specific help, do the command with "?" afterwards, for example, ${prefix}hello ?`, );

    client.commands.forEach(c => {
        helpEmbed.addField(`${c.help.name}`, `${c.help.description}\n*usage: ${c.help.usage}*`);
    });

    message.channel.send(helpEmbed).catch(error => {
        console.log(error);
    });

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
    name: `${prefix}help`,
    description: `shows the list of all the commands`,
    type: `member`,
    usage: `${prefix}help`
}