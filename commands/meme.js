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
    const logContent = `<@${message.member.id}> asked for a meme!`;

    //https://www.youtube.com/playlist?list=PLFsQleAWXsj_4yDeebiIADdH5FMayBiJo
    var memes = [
        "https://youtu.be/yKC3F0rNnLE",
        "https://youtu.be/GPRD90nOKYQ",
        "https://youtu.be/KJLNgJoYV_8",
        "https://youtu.be/NKteK8gaOWc",
        "https://youtu.be/NKteK8gaOWc",
        "https://youtu.be/Hj0UvmXrQC0",
        "https://youtu.be/nCk2ppH2XnU",
        "https://youtu.be/q6EoRBvdVPQ",
        "https://youtu.be/8YWl7tDGUPA",
        "https://youtu.be/6bnanI9jXps",
        "https://youtu.be/cuNhfSM-144",
        "https://youtu.be/SBeYzoQPbu8",
        "https://youtu.be/ixQkcuZhXg8",
        "https://youtu.be/EWF8Nfm-LLk",
        "https://youtu.be/o2IeYyYYe1U",
        "https://youtu.be/32nkdvLq3oQ",
        "https://youtu.be/v3i8vsIUA7Q",
        "https://youtu.be/0r--lCyPjRY",
        "https://youtu.be/VV5JOQyUYNg",
        "https://youtu.be/b3sOOBicyDY",
        "https://youtu.be/zMtj4yJKuzk", //stopped at 14, resume at 15
        "https://youtu.be/FdSa0c_Xj3k"
    ];


    var rand = memes[Math.floor(Math.random() * memes.length)];
    message.channel.send(rand);

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
    name: `${prefix}meme`,
    description: `sends a random video from the "important videos" playlist on youtube`,
    type: `member`,
    usage: `${prefix}meme`
}