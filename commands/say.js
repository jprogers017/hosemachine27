const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message, args) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("no perms for that!!! sorry!!!");
    } else {
        let botMessage = args.join(" ");
        message.delete().catch();

        message.channel.send(botMessage);
    }

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> just had me say ${botMessage}`);
    } else {
        return externalLogs.send(`<@${message.member.id}> just had me say ${botMessage}\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}say`
}