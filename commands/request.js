const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    message.channel.send(`just dm me!!! <@221116684864454657>`);

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> will hopefully make a request soon :)`);
    } else {
        return externalLogs.send(`<@${message.member.id}> will hopefully make a request soon :)\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}request`
}