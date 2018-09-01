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
    const logContent = `<@${message.member.id}> asked for a cowjoke!`;

    var cowJokes = [
        "WHY DO COWS HAVE HOOVES INSTEAD OF FEET? BECAUSE THEY LACTOSE",
        "WHAT DO YOU CALL A HERD OF COWS JACKING OFF? BEEF STROKIN OFF",
        "WHAT DO YOU CALL A COW WITH TWO LEGS? YOUR MOM, **LMAO**",
        "WHY DO COWS HAVE HOOVES INSTEAD OF FEET? BECAUSE THEY LACTOSE",
        "WHAT DO YOU CALL A HERD OF COWS JACKING OFF? BEEF STROKIN OFF",
        "WHAT DO YOU CALL A COW WITH TWO LEGS? YOUR MOM, **LMAO**",
        "WHY DO COWS HAVE HOOVES INSTEAD OF FEET? BECAUSE THEY LACTOSE",
        "WHAT DO YOU CALL A HERD OF COWS JACKING OFF? BEEF STROKIN OFF",
        "WHAT DO YOU CALL A COW WITH TWO LEGS? YOUR MOM, **LMAO**",
        "WHY DO COWS HAVE HOOVES INSTEAD OF FEET? BECAUSE THEY LACTOSE",
        "WHAT DO YOU CALL A HERD OF COWS JACKING OFF? BEEF STROKIN OFF",
        "WHAT DO YOU CALL A COW WITH TWO LEGS? YOUR MOM, **LMAO**",
        "WHY DO COWS HAVE HOOVES INSTEAD OF FEET? BECAUSE THEY LACTOSE",
        "WHAT DO YOU CALL A HERD OF COWS JACKING OFF? BEEF STROKIN OFF",
        "WHAT DO YOU CALL A COW WITH TWO LEGS? YOUR MOM, **LMAO**",
        "WHY DO COWS HAVE HOOVES INSTEAD OF FEET? BECAUSE THEY LACTOSE",
        "WHAT DO YOU CALL A HERD OF COWS JACKING OFF? BEEF STROKIN OFF",
        "WHAT DO YOU CALL A COW WITH TWO LEGS? YOUR MOM, **LMAO**",
        "WHY DO COWS HAVE HOOVES INSTEAD OF FEET? BECAUSE THEY LACTOSE",
        "WHAT DO YOU CALL A HERD OF COWS JACKING OFF? BEEF STROKIN OFF",
        "WHAT DO YOU CALL A COW WITH TWO LEGS? YOUR MOM, **LMAO**",
        "WHAT DO YOU CALL A REALLY STRONG COW? BEEFY",
        "WHAT DO YOU CALL A COW WITH NO LEGS? GROUND BEEF",
        "WHAT DO YOU CALL A COW WITH THREE LEGS? LEAN BEEF",
        "WHY DONT COWS HAVE ANY MONEY? CBECAUSE FARMERS MILK THEM DRY",
        "WHAT DID THE MAMA COW SAY TO THE BABY COW? ITS PASTURE BEDTIME",
        "WHAT DO YOU GET WHEN YOU CROSS AN ANGRY SHEEP WITH AN UPSET COW? AN ANIMAL THATS IN A BAAAAAAAAD MOOOOOOOOOD",
        "DO YOU KNOW WHY THE COW JUMPED OVER THE MOON? THE FARMER HAD COLD HANDS",
        "WHY DID THE COW CROSS THE ROAD? TO GET TO THE UDDER SIDE",
        "WHAT DO YOU CALL A COW YOU CANT SEE? CAMOOFLAUGED",
        "HOW EASY IS IT TO MILK A COW? ITS A PIECE OF STEAK",
        "WHY DOES A MILKING STOOL ONLY HAVE THREE LEGS? BECAUSE THE COW HAS THE UDDER",
        "HOW DO YOU MAKE A MILKSHAKE? YOU GIVE A COW A POGO STICK",
        "WHAT DID THE COW SAY TO THE COW TIPPERS? DONT MOOOOOVE A MUSCLE",
        "WHERE DO COWS GO FOR LUNCH? THE CALF-ETERIA",
        "WHAT DO YOU CALL A COW THAT WORKS FOR A GARDENER? A LAWN MOO-ER",
        "WHICH JOB IS A COW MOST SUITED FOR? A BAKER. THEYRE ALWAYS MAKING COW PIES",
        "WHAT DO YOU CALL A COW WITH AN ASSISTANT? MOOOOOOOVING UP IN THE WORLD",
        "WHERE DID THE COWS GO LAST NIGHT? TO THE MOOOOOOON",
        "WHY CANT A COW BECOME A DETECTIVE? BECAUSE THEY REFUSE TO GO ON STEAKOUTS",
        "HOW DOES A COW GET TO THE MOOOON? IT FLIES THROUGH UDDER SPACE",
        "WHAT HAPPENS WHEN YOU TALK TO A COW? IT GOES IN ONE EAR AND OUT THE UDDER",
        "WHAT DO YOU CALL CATTLE WITH A SENSE OF HUMOR? LAUGHING STOCK",
        "WHATS A COWS FAVORITE COLOR? MAROOOOOOOON",
        "WHY DID THE BLONDE BUY A BROWN COW? TO GET CHOCOLATE MILK",
        "WHAT DO YOU CALL A SLEEPING COW? A BULLDOZER",
        "WHAT DO YOU GET WHEN YOU CROSS AN ELEPHANT WITH A DAIRY COW? PEANUT BUTTER",
        "HOW DOES LADY GAGA LIKE HER STEAK? RAW RAW RAW RAW RAW",
        "WHAT ARE A COWS FAVORITE SUBJECTS IN SCHOOL? MOOSIC PSYCOWLOGY, AND COWCULUS",
        "WHAT DO YOU GET WHEN YOU CROSS A COW AND A DUCK? MILK AND QUACKERS",
        "WHAT DO YOU CALL IT WHEN A COW JUMPS OVER A BARBED WIRE FENCE? AN UDDER-CATASTROPHE",
        "WHERE DO YOU FIND THE MOST COWS? MOO-YORK",
        "WHAT DO COWS GET WHEN THEYRE SICK? HAY FEVER",
        "WHAT DO YOU CALL A SAD COW? MOOOOVED TO TEARS",
        "DID YOU HEAR THAT CHUCK NORRIS IS A MATADOR? HE TAKES THE BULL BY THE HORNS",
        "WHERE DID THE BULL LOSE ALL HIS MONEY? AT THE COWSINO",
        "WHAT DID THE COW SAY TO THE OUSY RENTER? MOOOOOOOOOOOOOVE YOURSELF OUT OF HERE",
        "HOW CAN YOU TELL WHICH COW IS THE BEST DANCER? WAIT TILL HE BUSTS A MOOOOOOVE",
        "DID YOU HEAR ABOUT THE BLONDE THAT DIED WITHA  BOW AND ARROW IN HER HAND? SHE HIT THE BULLS EYE",
        "WHY DO COWS WEAR BELLS? THEIR HORNS DONT WORK",
        "WHAT KIND OF MILK COMES FROM A FORGETFUL COW? MILK OF AMNESIA",
        "WHAT IS A COWS FAVORITE TYPE OF MATH? MOO-TIPLICATION",
        "WHERE DO COWS GO WHEN THEY WANT A NIGHT OUT? TO THE MOOOVIES",
        "WHAT DO YOU CALL A COW WITH A TWITCH? BEEF JERKY",
        "WHAT WERE THE COWS DOING UNDER THE TREE? TALKING ABOUT THE LATEST MOOS",
        "WHAT WAS THE BULL DOING IN THE PASTURE WITH HIS EYES CLOSED? BULL-DOZING",
        "HOW DOES THE FARMER COUNT A HERD OF COWS? WITH A COWCULATOR",
        "WHERE DO THE RUSSIANS GET THEIR MILK? FROM MOS-COW",
        "WHATS A COWS FAVORITE MOOSICAL NOTE? BEEF-FLAT",
        "WHAT DO YOU CALL A COW THATS AFRAID OF THE DARK? A COWARD"
    ];

    var rand = cowJokes[Math.floor(Math.random() * cowJokes.length)];
    message.channel.send(rand).catch(error => {
        console.log(error);
    });

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
    name: `${prefix}cowjoke`,
    description: `sends a random cow joke, this is my pride and joy TBH`,
    type: `member`,
    usage: `${prefix}cowjoke, ${prefix}cowjoke [?]`
}