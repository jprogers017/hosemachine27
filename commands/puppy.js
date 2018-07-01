const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    let logsChannel = message.guild.channels.find(`name`, "bot-logs");

    puppy1 = "./puppies/puppy1.jpg";
    puppy2 = "./puppies/puppy2.jpg";
    puppy3 = "./puppies/puppy3.jpg";
    puppy4 = "./puppies/puppy4.jpg";
    puppy5 = "./puppies/puppy5.jpg";
    puppy6 = "./puppies/puppy6.jpg";
    puppy7 = "./puppies/puppy7.jpg";
    puppy8 = "./puppies/puppy8.jpg";
    puppy9 = "./puppies/puppy9.jpg";
    puppy10 = "./puppies/puppy10.jpg";
    puppy11 = "./puppies/puppy11.jpg";
    puppy12 = "./puppies/puppy12.jpg";
    puppy13 = "./puppies/puppy13.jpg";
    puppy14 = "./puppies/puppy14.jpg";
    puppy15 = "./puppies/puppy15.jpg";
    puppy16 = "./puppies/puppy16.jpg";
    puppy17 = "./puppies/puppy17.jpg";
    puppy18 = "./puppies/puppy18.jpg";
    puppy19 = "./puppies/puppy19.jpg";
    puppy20 = "./puppies/puppy20.jpg";
    puppy21 = "./puppies/puppy21.jpg";
    puppy22 = "./puppies/puppy22.jpg";
    puppy23 = "./puppies/puppy23.jpg";
    puppy24 = "./puppies/puppy24.jpg";
    puppy25 = "./puppies/puppy25.jpg";
    puppy26 = "./puppies/puppy26.jpg";
    puppy27 = "./puppies/puppy27.jpg";
    puppy28 = "./puppies/puppy28.jpg";
    puppy29 = "./puppies/puppy29.jpg";
    puppy30 = "./puppies/puppy30.jpg";
    puppy31 = "./puppies/puppy31.jpg";
    puppy32 = "./puppies/puppy32.jpg";
    puppy33 = "./puppies/puppy33.jpg";
    puppy34 = "./puppies/puppy34.jpg";
    puppy35 = "./puppies/puppy35.jpg";
    puppy36 = "./puppies/puppy36.jpg";
    puppy37 = "./puppies/puppy37.jpg";
    puppy38 = "./puppies/puppy38.jpg";
    puppy39 = "./puppies/puppy39.jpg";
    puppy40 = "./puppies/puppy40.jpg";

    numberDog = 40;
    var randomDog = Math.floor(Math.random() * (numberDog - 1 + 1) + 1);
    switch (randomDog) {
        case 1:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy1]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy1]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 2:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy2]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy2]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 3:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy3]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy3]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 4:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy4]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy4]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 5:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy5]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy5]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 6:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy6]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy6]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 7:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy7]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy7]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 8:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy8]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy8]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 9:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy9]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy9]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 10:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy10]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy10]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 11:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy11]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy11]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 12:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy12]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy12]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 13:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy13]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy13]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 14:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy14]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy14]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 15:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy15]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy15]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 16:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy16]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy16]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 17:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy17]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy17]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 18:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy18]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy18]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 19:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy19]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy19]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 20:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy20]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy20]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 21:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy21]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy21]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 22:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy22]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy22]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 23:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy23]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy23]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 24:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy24]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy24]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 25:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy25]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy25]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 26:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy26]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy26]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 27:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy27]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy27]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 28:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy28]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy28]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 29:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy29]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy29]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 30:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy30]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy30]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 31:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy31]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy31]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 32:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy32]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy32]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 33:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy33]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy33]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 34:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy34]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy34]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 35:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy35]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy35]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 36:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy36]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy36]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 37:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy37]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy37]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 38:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy38]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy38]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 39:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy39]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy39]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
        case 40:
            if (!logsChannel) {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy40]
                });
            } else {
                message.channel.send("so...i hear that you wanted to see a puppy?");
                message.channel.send({
                    files: [puppy40]
                });
                return logsChannel.send(`**${message.member.displayName}** got a :dog:!!!`);
            }
            break;
    }
}

module.exports.help = {
    name: "puppy"
}