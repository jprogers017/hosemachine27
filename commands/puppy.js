const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;

module.exports.run = async (client, message) => {
    const serverLogs = client.channels.get(myServerLogs);
    const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);

    number = 40;
    var randomDog = Math.floor(Math.random() * (number - 1 + 1)) + 1;

    message.channel.send("did someone mention...dogs?");
    message.channel.send({
        files: ["./puppies/" + randomDog + ".jpg"]
    });

    if (message.guild.id == myServerID) {
        return serverLogs.send(`<@${message.member.id}> asked to see a puppy`);
    } else {
        return externalLogs.send(`<@${message.member.id}> asked to see a puppy\n**SERVER**: *${message.guild.name}*  || **OWNED BY**: ${message.guild.owner}`);
    }
}

module.exports.help = {
    name: `${prefix}puppy`
}