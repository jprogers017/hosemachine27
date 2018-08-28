const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    let kinkshamedUser = message.mentions.members.first();
    if (kinkshamedUser == undefined) {
        return message.reply(`who am i kinkshaming?`);
    } else {
        message.channel.send(`${kinkshamedUser}, should i be kinkshaming u? i think i should`);
    }
    
    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> is PROBABLY being kinkshamed!`);
    } else {
        return externalLogs.send(`<@${message.member.id}> is PROBABLY being kinkshamed!\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}kinkshame`
}