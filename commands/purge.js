const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) message.reply("lmao, u dont have perms for that. stupid bitch");
    if (!args[0]) message.channel.send("yo, u cant clear 0 messages, dumb fuck");
    if ((message.member.hasPermission("MANAGE_MESSAGES")) && (args[0])) {
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`cleared ${args[0]} messages, yikes`).then(msg => msg.delete(2500));
        });
    }

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> cleared ${args[0]} messages`);
    } else {
        return externalLogs.send(`<@${message.member.id}> cleared ${args[0]} messages\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}purge`
}