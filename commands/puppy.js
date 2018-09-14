const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args, authorName, logsEmbed, help) => {
    //variables
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
    var logContent;
    var number = 40;
    var randomDog = Math.floor(Math.random() * (number - 1 + 1)) + 1;

    //set embeds
    help.setTitle(exports.help.usage);
    help.setDescription(exports.help.description);

    //command
    if (args[0] === "?") {
        logContent = `<@${message.member.id}> asked for help on how to see a puppy :)`;
        message.channel.send(help);
    } else if (!message.guild) {
        return;
    } else {
        logContent = `<@${message.member.id}> asked to see a puppy!`;
        message.channel.send("did someone mention...dogs?");
        message.channel.send({
            files: ["./puppies/" + randomDog + ".jpg"]
        });
    }

    //logs
    logsEmbed.setDescription(logContent);
    if (message.guild.id == config.myServerID) {
        return serverLogs.send(logsEmbed);
    } else {
        logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        return externalLogs.send(logsEmbed);
    }
}

module.exports.help = {
    name: `${prefix}puppy`,
    description: `sends u a random puppy picture`,
    type: `member`,
    usage: `${prefix}puppy, ${prefix}puppy [?]`
}