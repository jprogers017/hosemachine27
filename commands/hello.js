const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, c, args) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    // const helpMsg = args.join(" ");
    var logContent = `<@${message.member.id}> said hello!`;

    // if (message.content === `${prefix}hello ???`) {
    //     logContent = `<@${message.member.id}> asked for some help with ${prefix}${c.help.name}`;
    //     if (message.member.nickname) {
    //         var authorName = message.member.nickname;
    //     } else {
    //         var authorName = message.author.username;
    //     }
    //     let commandSpecificEmbed = new Discord.RichEmbed()
    //         .setAuthor(`i heard u needed help with ${prefix}hello, ${authorName}?`, message.author.avatarURL)
    //         .setDescription(`usage: ${prefix}command *<required>, [optional]*`)
    //         .addField(`name:`, c.help.name, true)
    //         .addField(`description:`, c.help.description, true)
    //         .addField(`usage:`, c.help.usage, true)
    //         .setColor(message.member.displayHexColor);
    //     message.channel.send(commandSpecificEmbed).catch(error => {
    //         console.log(error);
    //     });

    // } else {
    message.channel.send(`Hello!!!`).catch(error => {
        console.log(error);
    });
    // }

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
    name: `${prefix}hello`,
    description: `say hello!`,
    usage: `${prefix}hello, ${prefix}hello [?]`
}