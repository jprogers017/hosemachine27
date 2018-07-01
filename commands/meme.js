const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

//https://www.youtube.com/playlist?list=PLFsQleAWXsj_4yDeebiIADdH5FMayBiJo
module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

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

    if (!logsChannel) {
        var rand = memes[Math.floor(Math.random() * memes.length)];
        message.channel.send(rand);
    } else {
        var rand = memes[Math.floor(Math.random() * memes.length)];
        message.channel.send(rand);
        return logsChannel.send(`**${message.member.displayName}** asked for a meme, oh no`);
    }
}

module.exports.help = {
    name: "meme"
}