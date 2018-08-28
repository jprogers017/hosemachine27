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

    let botIcon = client.user.displayAvatarURL;
    let helpEmbed = new Discord.RichEmbed()
        .setTitle("hosemachine (27) help info :)")
        .setDescription(`use the ${prefix} prefix!`)
        .setColor("#7fc0ff")
        .setThumbnail(botIcon)
        .addField("Commands", `${prefix}commands`, true)
        .addField("Github", "<https://goo.gl/rua7h6>")
        .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

    message.channel.send(helpEmbed);

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> asked for help!`);
    } else {
        return externalLogs.send(`<@${message.member.id}> asked for help!\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}help`
}