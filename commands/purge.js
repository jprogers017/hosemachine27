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
    const logContent = `<@${message.member.id}> cleared ${args[0]} messages`;

    if (!message.member.hasPermission("ADMINISTRATOR")) message.reply("lmao, u dont have perms for that. stupid bitch").catch(error => {
        console.log(error);
    });
    if (!args[0]) message.channel.send("yo, u cant clear 0 messages, dumb fuck").catch(error => {
        console.log(error);
    });
    if ((message.member.hasPermission("ADMINISTRATOR")) && (args[0])) {
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`cleared ${args[0]} messages, yikes`).then(msg => msg.delete(2500));
        }).catch(error => {
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
    name: `${prefix}purge`,
    description: `ADMINISTRATOR PERMISSIONS REQUIRED\npurges a set set of messages`,
    type: `admin`,
    usage: `${prefix}purge <number of messages>, ${prefix}purge [?]`
}