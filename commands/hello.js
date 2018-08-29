const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    message.channel.send(`Hello!!!`);

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> said hello!`);
    } else {
        return externalLogs.send(`<@${message.member.id}> said hello!\n**SERVER**: *${message.guild.name}* || **CHANNEL**: ${message.channel.name} || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}hello`
}