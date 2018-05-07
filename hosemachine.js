const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const client = new Discord.Client({
  disableEveryone: true
});

client.commands = new Discord.Collection();

var config = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));

const discordToken = config.discordToken;
const prefix = config.prefix;

client.login(discordToken);

//on message in console and activity
client.on('ready', function () {
  console.log(`${client.user.username} is online in ${client.guilds.size} server(s)`);
  client.user.setActivity("type ;)cowjoke, i dare u");
});

client.on('message', function (message) {
  const mess = message.content.toLowerCase();
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let logsChannel = message.guild.channels.find(`name`, "bot-logs");

  //hello aka me testing if BOT FUCKIN WORKS
  if (mess.startsWith(prefix + "hello")) {
    if (!logsChannel) {
      message.channel.send("Hello!");
    } else {
      message.channel.send("Hello!");
      return logsChannel.send(`**${message.member.displayName}** said hello!!!`);
    }
  }

  //joke filter
  if (mess.includes("heck") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language, whore");
    } else {
      message.channel.send("watch ur FUCKIN language, whore");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: heck`);
    }
  }

  if (mess.includes("frick") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language, whore");
    } else {
      message.channel.send("watch ur FUCKIN language, whore");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: frick`);
    }
  }

  if (mess.includes("darn") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language, whore");
    } else {
      message.channel.send("watch ur FUCKIN language, whore");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: darn`);
    }
  }

  if (mess.includes("binch") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language, whore");
    } else {
      message.channel.send("watch ur FUCKIN language, whore");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: binch`);
    }
  }

  //stupid reply shit for fun lmfao, emojis
  if (mess.includes("fuck me") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send(":weary: :ok_hand: :sweat_drops:");
    } else {
      message.channel.send(":weary: :ok_hand: :sweat_drops:");
      return logsChannel.send(`**${message.member.displayName}** said fuck me,,,,:weary: :ok_hand: :sweat_drops:`);
    }
  }

  if (mess.includes("yeehaw") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("YAWHEE :cowboy: :cowboy: :cowboy:");
    } else {
      message.channel.send("YAWHEE :cowboy: :cowboy: :cowboy:");
      return logsChannel.send(`**${message.member.displayName}** said yeehaw and got YAWHEE :cowboy: back`);
    }
  }

  //stupid reply shit for fun lmfao, no emojis
  if (mess.includes("wadu") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("<@162655287021535232> shut the hell up");
    } else {
      message.channel.send("<@162655287021535232> shut the hell up");
      return logsChannel.send(`told **${message.member.displayName}** to shut the hell up`);
    }
  }

  if (mess.includes("kink") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("i am KINKSHAMING");
    } else {
      message.channel.send("i am KINKSHAMING");
      return logsChannel.send(`**${message.member.displayName}** is being kinkshamed`);
    }
  }

  if (mess.includes("whomst") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("the FUCK");
    } else {
      message.channel.send("the FUCK");
      return logsChannel.send(`**${message.member.displayName}**... whoms't the FUCK`);
    }
  }

  if (mess.includes("pussy bitch") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("<@162655287021535232>, ur a pussy bitch");
    } else {
      message.channel.send("<@162655287021535232>, ur a pussy bitch");
      return logsChannel.send(`**${message.member.displayName}** called <@162655287021535232> a pussy bitch`);
    }
  }

  //stupid react shit for fun lmfao
  if (mess.includes("gay") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.react('🏳️‍🌈');
    } else {
      message.react('🏳️‍🌈');
      return logsChannel.send(`**${message.member.displayName}** got a :gay_pride_flag:`);
    }
  }

  if (mess.includes("eyes emoji") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.react("👀");
    } else {
      message.react("👀");
      return logsChannel.send(`**${message.member.displayName}** got :eyes:`);
    }
  }

  if (mess.includes("wet") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.react("💦");
    } else {
      message.react("💦");
      return logsChannel.send(`**${message.member.displayName}** got :sweat_drops:`);
    }
  }

  //joke commands LOL
  if (mess.startsWith(prefix + "suckmydick")) {
    if (!logsChannel) {
      message.channel.send(`u gotta ping jackie first, <@200837857214988298>\nhttps://youtu.be/OH35pNmEwh4?t=7s`);
    } else {
      message.channel.send(`u gotta ping jackie first, <@200837857214988298>\nhttps://youtu.be/OH35pNmEwh4?t=7s`);
      return logsChannel.send(`**${message.member.displayName}** told jackie to suck their dick\nhttps://youtu.be/OH35pNmEwh4?t=7s`);
    }
  }

  if (mess.startsWith(prefix + "eatmyass")) {
    if (!logsChannel) {
      message.channel.send(`u should ping millie`);
    } else {
      message.channel.send(`u should ping millie`);
      return logsChannel.send(`**${message.member.displayName}** told millie to eat their ass`);
    }
  }

  //admin commands
  //admin help
  if (mess.startsWith(prefix + "adminhelp")) {
    if (!logsChannel) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("lmao, u dont have perms for that. stupid bitch");
        return logsChannel.send(`lmao, **${message.member.displayName}** asked for admin commands, but doesnt have admin perms? fuckin loser`);
      };
      let botIcon = client.user.displayAvatarURL;
      let botEmbed = new Discord.RichEmbed()
        .setTitle("Admin Help")
        .setDescription("u need admin perms 4 this shit")
        .setColor("#7fc0ff")
        .setThumbnail(botIcon)
        .addField("Commands", "purge\nsay\nkick and ban are # broke rn", true)
        .addField("Other shit?", "nothing yet, lmao", true)
        .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

      message.channel.send(botEmbed);
    } else {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("lmao, u dont have perms for that. stupid bitch");
        return logsChannel.send(`lmao, **${message.member.displayName}** asked for admin commands, but doesnt have admin perms? fuckin loser`);
      };
      let botIcon = client.user.displayAvatarURL;
      let botEmbed = new Discord.RichEmbed()
        .setTitle("Admin Help")
        .setDescription("u need admin perms 4 this shit")
        .setColor("#7fc0ff")
        .setThumbnail(botIcon)
        .addField("Commands", "purge\nsay\nidk lmao i havent added anything else", true)
        .addField("Other shit?", "nothing yet, lmao", true)
        .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

      message.channel.send(botEmbed);
      return logsChannel.send(`**${message.member.displayName}** needed admin help`);
    }
  }

  //purge
  if (mess.startsWith(prefix + "purge")) {
    if (!logsChannel) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("lmao, u dont have perms for that. stupid bitch");
        return logsChannel.send(`lmao, **${message.member.displayName}** purged ${args[0]} messages, but doesnt have perms for it`);
      };
      if (!args[0]) {
        message.channel.send("yo, u cant clear 0 messages, dumb fuck");
        return logsChannel.send(`**${message.member.displayName}** tried purging nothing? ok`);
      };
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`cleared ${args[0]} messages, yikes`).then(msg => msg.delete(1500));
      });
    } else {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("lmao, u dont have perms for that. stupid bitch");
        return logsChannel.send(`lmao, **${message.member.displayName}** purged ${args[0]} messages, but doesnt have perms for it`);
      };
      if (!args[0]) {
        message.channel.send("yo, u cant clear 0 messages, dumb fuck");
        return logsChannel.send(`**${message.member.displayName}** tried purging nothing? ok`);
      };
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`cleared ${args[0]} messages, yikes`).then(msg => msg.delete(1500));
      });
      return logsChannel.send(`**${message.member.displayName}** purged ${args[0]} messages`);
    }
  };

  //say
  if (mess.startsWith(prefix + "say")) {
    if (!logsChannel) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("no perms 4 that, fucker");
        return logsChannel.send(`**${message.member.displayName}** tried to say ${botMessage} but doesnt have perms`);
      }
      let botMessage = args.join(" ");
      message.delete().catch();

      message.channel.send(botMessage);
    } else {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("no perms 4 that, fucker");
        return logsChannel.send(`**${message.member.displayName}** tried to say ${botMessage} but doesnt have perms`);
      }
      let botMessage = args.join(" ");
      message.delete().catch();

      message.channel.send(botMessage);
      return logsChannel.send(`**${message.member.displayName}** told hosemachine (27) to say *${botMessage}*`);
    }
  }

  //commands
  //help
  if (mess.startsWith(prefix + "help")) {
    if (!logsChannel) {
      let botIcon = client.user.displayAvatarURL;
      let botEmbed = new Discord.RichEmbed()
        .setTitle("hosemachine (27) help info :)")
        .setDescription("use the ;) prefix")
        .setColor("#7fc0ff")
        .setThumbnail(botIcon)
        .addField("Commands", "serverinfo\ncowjoke\ndadjoke\nknockknock\nvine\nmeme", true)
        .addField("Other Features", "swear filter!!!\nsometimes words r actually emojis\nsometimes bot will yell things at u", true)
        .addField("Code, if u want it lol", "https://goo.gl/rua7h6")
        .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

      message.channel.send(botEmbed);
    } else {
      let botIcon = client.user.displayAvatarURL;
      let botEmbed = new Discord.RichEmbed()
        .setTitle("hosemachine (27) help info :)")
        .setDescription("use the ;) prefix")
        .setColor("#7fc0ff")
        .setThumbnail(botIcon)
        .addField("Commands", "serverinfo\ncowjoke\ndadjoke\nknockknock\nvine\nmeme", true)
        .addField("Other Features", "swear filter!!!\nsometimes words r actually emojis\nsometimes bot will yell things at u", true)
        .addField("Code, if u want it lol", "https://goo.gl/rua7h6")
        .setFooter(`Created by: Josephine#6301 on ${client.user.createdAt}`);

      message.channel.send(botEmbed);
      return logsChannel.send(`**${message.member.displayName}** needed help`);
    }
  }

  //server info
  if (mess.startsWith(prefix + "serverinfo")) {
    if (!logsChannel) {
      let serverIcon = message.guild.iconURL;
      let serverEmbed = new Discord.RichEmbed()
        .setTitle("Server Information")
        .setColor("#7fc0ff")
        .setThumbnail(serverIcon)
        .addField("Server Name", message.guild.name, true)
        .addField("Total Members", message.guild.memberCount, true)
        .addField("Created On", message.guild.createdAt, true)
        .addField("You joined", message.member.joinedAt, true);

      message.channel.send(serverEmbed);
    } else {
      let serverIcon = message.guild.iconURL;
      let serverEmbed = new Discord.RichEmbed()
        .setTitle("Server Information")
        .setColor("#7fc0ff")
        .setThumbnail(serverIcon)
        .addField("Server Name", message.guild.name, true)
        .addField("Total Members", message.guild.memberCount, true)
        .addField("Created On", message.guild.createdAt, true)
        .addField("You joined", message.member.joinedAt, true);

      message.channel.send(serverEmbed);
      return logsChannel.send(`**${message.member.displayName}** asked for server info`);
    }

  }

  //ping
  if (mess.startsWith(prefix + "ping")) {
    if (!logsChannel) {
      message.channel.send(((new Date().getTime() - message.createdTimestamp) * -1) + " ms");
    } else {
      message.channel.send(((new Date().getTime() - message.createdTimestamp) * -1) + " ms");
      return logsChannel.send(`**${message.member.displayName}** used ping, it took ${((new Date().getTime() - message.createdTimestamp) * -1)}  ms to respond`);
    }
  }

  //8 ball
  if (mess.startsWith(prefix + "8ball")) {
    var eightBallReplies = [
      "It is certain",
      "It is decidely so",
      "Without a doubt",
      "Yes, definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Signs point to yes",
      "Yes",
      "Reply hazy, try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Maybe",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful",
      "No"
    ];

    if (!logsChannel) {
      if (!args[1]) {
        message.reply("more than a one worded question, hun");
        return logsChannel.send(`**${message.member.displayName}** tried to ask a question??? i think???`);
      } else {
        let eightBallResult = Math.floor((Math.random() * eightBallReplies.length));
        let eightBallQuestion = args.slice(1).join(" ");

        message.reply(eightBallReplies[eightBallResult]);
      }
    } else {
      if (!args[1]) {
        message.reply("more than a one worded question, hun");
        return logsChannel.send(`**${message.member.displayName}** tried to ask a question??? i think???`);
      } else {
        let eightBallResult = Math.floor((Math.random() * eightBallReplies.length));
        let eightBallQuestion = args.slice(1).join(" ");

        message.reply(eightBallReplies[eightBallResult]);
        return logsChannel.send(`**${message.member.displayName}** asked the 8ball ${eightBallQuestion}`);
      }
    }

  }

  //cow JOKES
  if (mess.startsWith(prefix + "cowjoke")) {
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

    if (!logsChannel) {
      var rand = cowJokes[Math.floor(Math.random() * cowJokes.length)];
      message.channel.send(rand);
    } else {
      var rand = cowJokes[Math.floor(Math.random() * cowJokes.length)];
      message.channel.send(rand);
      return logsChannel.send(`**${message.member.displayName}** asked for a cow joke, LMAO NICE`);
    }
  }

  //dad JOKES
  if (mess.startsWith(prefix + "dadjoke")) {
    var dadJokes = [
      "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
      "What do you call a fake noodle? An Impasta.",
      "How many apples grow on a tree? All of them.",
      "Want to hear a joke about paper? Nevermind it's tearable.",
      "I just watched a program about beavers. It was the best dam program I've ever seen.",
      "Why did the coffee file a police report? It got mugged.",
      "How does a penguin build it's house? Igloos it together.",
      "Dad, did you get a haircut? No I got them all cut.",
      "What do you call a Mexican who has lost his car? Carlos.",
      "Dad, can you put my shoes on? No, I don't think they'll fit me.",
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
      "Why don't skeletons ever go trick or treating? Because they have no body to go with.",
      "Ill call you later. Don't call me later, call me Dad.",
      "What do you call an elephant that doesn't matter? An irrelephant",
      "Want to hear a joke about construction? I'm still working on it.",
      "What do you call cheese that isn't yours? Nacho Cheese.",
      "Why couldn't the bicycle stand up by itself? It was two tired.",
      "What did the grape do when he got stepped on? He let out a little wine.",
      "I wouldn't buy anything with velcro. It's a total rip-off.",
      "The shovel was a ground-breaking invention.",
      "Dad, can you put the cat out? I didn't know it was on fire.",
      "This graveyard looks overcrowded. People must be dying to get in there.",
      "Whenever the cashier at the grocery store asks my dad if he would like the milk in a bag he replies, 'No, just leave it in the carton!'",
      "5/4 of people admit that they’re bad with fractions.",
      "Two goldfish are in a tank. One says to the other, 'do you know how to drive this thing ?'",
      "What do you call a man with a rubber toe? Roberto.",
      "What do you call a fat psychic? A four-chin teller.",
      "I would avoid the sushi if I was you. It’s a little fishy.",
      "To the man in the wheelchair that stole my camouflage jacket... You can hide but you can't run.",
      "The rotation of earth really makes my day.",
      "I thought about going on an all-almond diet. But that's just nuts",
      "What's brown and sticky? A stick.",
      "I’ve never gone to a gun range before. I decided to give it a shot!",
      "Why do you never see elephants hiding in trees? Because they're so good at it.",
      "Did you hear about the kidnapping at school? It's fine, he woke up.",
      "A furniture store keeps calling me. All I wanted was one night stand.",
      "I used to work in a shoe recycling shop. It was sole destroying.",
      "Did I tell you the time I fell in love during a backflip? I was heels over head.",
      "I don’t play soccer because I enjoy the sport. I’m just doing it for kicks.",
      "People don’t like having to bend over to get their drinks. We really need to raise the bar."
    ];

    if (!logsChannel) {
      var rand = dadJokes[Math.floor(Math.random() * dadJokes.length)];
      message.channel.send(rand);
    } else {
      var rand = dadJokes[Math.floor(Math.random() * dadJokes.length)];
      message.channel.send(rand);
      return logsChannel.send(`**${message.member.displayName}** asked for a dad joke, LMAO NICE`);
    }
  }

  //knock knock JOKES
  if (mess.startsWith(prefix + "knockknock")) {
    var knockKnockJokes = [
      "knock knock\nwhos there?\nrobin\nrobin who?\nrobin u, now gimme uR FUCKIN MONEY\n*https://www.youtube.com/watch?v=4asxm6susvA*",
      "knock knock\nwhos there?\nrobin\nrobin who?\nrobin u, now gimme uR FUCKIN MONEY\n*https://www.youtube.com/watch?v=4asxm6susvA*",
      "knock knock\nwhos there?\nrobin\nrobin who?\nrobin u, now gimme uR FUCKIN MONEY\n*https://www.youtube.com/watch?v=4asxm6susvA*",
      "knock knock\nwhos there?\nrobin\nrobin who?\nrobin u, now gimme uR FUCKIN MONEY\n*https://www.youtube.com/watch?v=4asxm6susvA*",
      "knock knock\nwhos there?\nrobin\nrobin who?\nrobin u, now gimme uR FUCKIN MONEY\n*https://www.youtube.com/watch?v=4asxm6susvA*",
      "knock knock\nwhos there?\nrobin\nrobin who?\nrobin u, now gimme uR FUCKIN MONEY\n*https://www.youtube.com/watch?v=4asxm6susvA*",
      "knock knock\nwhos there?\nrobin\nrobin who?\nrobin u, now gimme uR FUCKIN MONEY\n*https://www.youtube.com/watch?v=4asxm6susvA*",
      "knock knock\nwhos there?\ncow says\ncow says who?\nno, a cow says *mooooooo*",
      "knock knock\nwhos there?\ncow says\ncow says who?\nno, a cow says *mooooooo*",
      "knock knock\nwhos there?\ncow says\ncow says who?\nno, a cow says *mooooooo*",
      "knock knock\nwhos there?\ncow says\ncow says who?\nno, a cow says *mooooooo*",
      "knock knock\nwhos there?\ncow says\ncow says who?\nno, a cow says *mooooooo*",
      "knock knock\nwhos there?\ncow says\ncow says who?\nno, a cow says *mooooooo*",
      "knock knock\nwhos there?\ncow says\ncow says who?\nno, a cow says *mooooooo*",
      "knock knock\nwhos there?\nmustache\nmustache who?\ni mustache u a question, but ill shave it for later",
      "knock knock\nwhos there?\netch\netch who?\nbless u",
      "knock knock\nwhos there?\ntank\ntank who?\nur welcome",
      "knock knock\nwhos there?\ni smell mop\ni smell mop who?\ny would u smell ur poo",
      "knock knock\nwhos there?\ni eat mop\ni eat mop who\nu eat ur poo??? wtf",
      "knock knock\nwhos there?\nspell\nspell who?\nok, W. H. O. can u not spell who or somethin? dumbass",
      "knock knock\nwhos there?\ncandice\ncandice who? candice door fuckin open or what",
      "knock knock\nwhos there?\nboo\nboo who?\nlmfao pussy bitch, did u get scared of a joke?",
      "knock knock\nwhos there?\nstopwatch\nstopwatch who?\nstopwatch ur doin and PAY ATTENTION",
      "knock knock\nwhos there?\nto\nto who?\nnah bitch its to *WHOM* learn ur grammar",
      "knock knock\nwhos there?\nalec\nalec who?\nalec-tricity. aint that a shocker",
      "knock knock\nwhos there?\nsays\nsays who?\nsays me, thats who",
      "knock knock\nwhos there?\nstupid\nstupid who?\nstupid u, thats who"
    ];

    if (!logsChannel) {
      var rand = knockKnockJokes[Math.floor(Math.random() * knockKnockJokes.length)];
      message.channel.send(rand);
    } else {
      var rand = knockKnockJokes[Math.floor(Math.random() * knockKnockJokes.length)];
      message.channel.send(rand);
      return logsChannel.send(`**${message.member.displayName}** asked for a knock knock joke, LMAO NICE`);
    }
  }

  if (mess.includes("knock knock") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("whos there?");
    } else {
      message.channel.send("whos there?");
      return logsChannel.send(`replied to **${message.member.displayName}**: whos there?`);
    }
  }


  //vines??? what more is there to say LOL https://www.youtube.com/playlist?list=PLCRi2kg6z92FPyTu4ut49faqAYPS5eBsA
  if (mess.startsWith(prefix + "vine")) {
    var vine = [
      "https://youtu.be/y7LY46fyRVQ",
      "https://youtu.be/bFw5lrN-mig",
      "https://youtu.be/qUEy55r49fY",
      "https://youtu.be/XzR3pX31Hoo",
      "https://youtu.be/q7ekk47uLdM",
      "https://youtu.be/bTv2upWCLY8",
      "https://youtu.be/t67bRKIy9ZY",
      "https://youtu.be/rZuFj9dSaBQ",
      "https://youtu.be/Hs0AO0K2xcM",
      "https://youtu.be/iE7pkQSQglg",
      "https://youtu.be/iE7pkQSQglg",
      "https://youtu.be/iE7pkQSQglg",
      "https://youtu.be/ydk_pc-jx1c",
      "https://youtu.be/4xc9MHo4FCw",
      "https://youtu.be/jKD05qgHthk",
      "https://youtu.be/jKD05qgHthk",
      "https://youtu.be/TAZYqXwW5lA",
      "https://youtu.be/BiR5P48JeKU",
      "https://youtu.be/mBitRAiRPIA",
      "https://youtu.be/mBitRAiRPIA",
      "https://youtu.be/pFSXx3BerNQ",
      "https://youtu.be/8aCgeKfhS54",
      "https://youtu.be/8Iqac1RyBME",
      "https://youtu.be/jLloLp3zLDw",
      "https://youtu.be/NYCQn2udzmY",
      "https://youtu.be/UGTNAnQFpUE",
      "https://youtu.be/YcBfDQIJHiI",
      "https://youtu.be/qEEI2tFvKSI",
      "https://youtu.be/KbL-A8JdJvg",
      "https://youtu.be/KbL-A8JdJvg",
      "https://youtu.be/zufgsUEeHmc",
      "https://youtu.be/1nz8aZ67Prw",
      "https://youtu.be/1nz8aZ67Prw",
      "https://youtu.be/94LHw8fa_GE",
      "https://youtu.be/V2uUJSY7_jc",
      "https://youtu.be/ToLk-BwNCfM",
      "https://youtu.be/eQcf4n8E_uU",
      "https://youtu.be/Xyx3Gw6EBq8",
      "https://youtu.be/lSLSjqgzfwo",
      "https://youtu.be/jONn-spGhx8",
      "https://youtu.be/odFZbufP8p0",
      "https://youtu.be/zeeuZMW3P1A",
      "https://youtu.be/ZrXprytCMZk",
      "https://youtu.be/URlHFuka7jo",
      "https://youtu.be/ucLf27LfIZg",
      "https://youtu.be/QE9EVvM1Vns",
      "https://youtu.be/BOa4JCBQTY8",
      "https://youtu.be/ijAJne2BQ8c",
      "https://youtu.be/d__pJojzG-g",
      "https://youtu.be/8l0sxAGJZ9w",
      "https://youtu.be/aUfxqxMnHjA",
      "https://youtu.be/ukXkAz7MBdk",
      "https://youtu.be/ukXkAz7MBdk",
      "https://youtu.be/06367LPJGfA",
      "https://youtu.be/GctcztImvNo",
      "https://youtu.be/856Gq5YMMF4",
      "https://youtu.be/jfviUbgGimw",
      "https://youtu.be/t3onBxGCy0c",
      "https://youtu.be/MLwVinRJg-I",
      "https://youtu.be/EuE3P4vyvD4",
      "https://youtu.be/YfFko5qhZtY",
      "https://youtu.be/YfFko5qhZtY",
      "https://youtu.be/HJAkUk-9RfE",
      "https://youtu.be/45rJbXjfnSE",
      "https://youtu.be/NOPIobI_0B8",
      "https://youtu.be/6-9PbCok1sU",
      "https://youtu.be/laLgR0mLL1A",
      "https://youtu.be/laLgR0mLL1A",
      "https://youtu.be/b21NdQg7zL4",
      "https://youtu.be/GZyQkido454",
      "https://youtu.be/Eywp61pXUm4",
      "https://youtu.be/D8j_f9eDlbA",
      "https://youtu.be/rMzRwwo1PZg",
      "https://youtu.be/ChLf-ed7tX8",
      "https://youtu.be/ChLf-ed7tX8",
      "https://youtu.be/oXU-7czQWAU",
      "https://youtu.be/q4F2Qv5Ddcw",
      "https://youtu.be/kI65vqwg-lM",
      "https://youtu.be/q4F2Qv5Ddcw",
      "https://youtu.be/XUjTmTnnszk",
      "https://youtu.be/aF1qQxPhybE",
      "https://youtu.be/s8zO0xVgdkk",
      "https://youtu.be/3HldLkTST94",
      "https://youtu.be/rNEINbvGEro",
      "https://youtu.be/X7WxTi3uaiE",
      "https://youtu.be/3FnvRYszrWQ",
      "https://youtu.be/WtE4GlfrPfc",
      "https://youtu.be/rfjUYWq9SAY",
      "https://youtu.be/GaNGKD4MTV0",
      "https://youtu.be/vhCypQDusYI",
      "https://youtu.be/vqE6I181COA",
      "https://youtu.be/zTJm_7yJn3c",
      "https://youtu.be/KeFeGms9Jls",
      "https://youtu.be/UBQP9gEldRk",
      "https://youtu.be/uWz-PY8qXZw",
      "https://youtu.be/8fzEJRxDKiU",
      "https://youtu.be/dNavpxx_PPk",
      "https://youtu.be/R5J7znTWijg",
      "https://youtu.be/KoKPT_cnyXs",
      "https://youtu.be/IM1uBvNvUuE",
      "https://youtu.be/7UuK9w3DYK4",
      "https://youtu.be/c9H7wwfrpgI",
      "https://youtu.be/4zLpv_3z7gc",
      "https://youtu.be/4zLpv_3z7gc",
      "https://youtu.be/kU-u6151Ugo",
      "https://youtu.be/7eSSE-dd2yY",
      "https://youtu.be/Tlwda9S58Lg",
      "https://youtu.be/HjM_2ojJBoM",
      "https://youtu.be/7f3DHfYNqwc",
      "https://youtu.be/Pk8ueJmLvBE",
      "https://youtu.be/FQQ1kIbKnms",
      "https://youtu.be/1RgAyZyKZZI",
      "https://youtu.be/CIezqiRltTo",
      "https://youtu.be/r4tOIFPwyUo",
      "https://youtu.be/Isrd9-h1Kbg",
      "https://youtu.be/hcehzlBd_uY",
      "https://youtu.be/_zZC_CE6jx8",
      "https://youtu.be/-4UMUjBvIec",
      "https://youtu.be/jNgUgKltj-Y",
      "https://youtu.be/r9Iwph3aU2U",
      "https://youtu.be/609YTBQzQyY",
      "https://youtu.be/OyBmEeojfKo",
      "https://youtu.be/xjst9kmTv-4",
      "https://youtu.be/n7TF0vSY6Ww",
      "https://youtu.be/blpe_sGnnP4",
      "https://youtu.be/meAT7-82e_g",
      "https://youtu.be/Vfys5p4D04U",
      "https://youtu.be/s5BSAIUSUc4",
      "https://youtu.be/d6gBu2Zd7Bc",
      "https://youtu.be/eTonc3Ql8AM",
      "https://youtu.be/EHJusUTrPg8",
      "https://youtu.be/WYEcKNyW4iA",
      "https://youtu.be/6hQ49ver8Ew",
      "https://youtu.be/rePPQFm9fzY",
      "https://youtu.be/7merzCPl-Xg",
      "https://youtu.be/X7cQ7KnoRk0",
      "https://youtu.be/1eQZLd6AABE",
      "https://youtu.be/ZlYlPX2KhyE",
      "https://youtu.be/7DCz1SgByDM",
      "https://youtu.be/cMzddpU904U",
      "https://youtu.be/Wo9p4Lqaakg",
      "https://youtu.be/o0taTX4egz4",
      "https://youtu.be/tA8LjcpjjKQ",
      "https://youtu.be/rDr7du3NbEI",
      "https://youtu.be/zEFoyDYu-ck",
      "https://youtu.be/XkCDwL7kOgo",
      "https://youtu.be/zsUBRCdEDYY",
      "https://youtu.be/U8HDMK963dM",
      "https://youtu.be/ekl_arkB4MU",
      "https://youtu.be/2bnnDTPCA94",
      "https://youtu.be/CIZePAoYE9w",
      "https://youtu.be/4TJZps0OZWI",
      "https://youtu.be/kwcT815Iwik",
      "https://youtu.be/6nC_d-dqFZc",
      "https://youtu.be/OrOEHFa_408",
      "https://youtu.be/MTIK8lKji_M",
      "https://youtu.be/5sIN0dwVhKA",
      "https://youtu.be/64ucqo3g7Q8",
      "https://youtu.be/LzS7FZTt1Pg",
      "https://youtu.be/Rbi4PZBQaiM",
      "https://youtu.be/t0IYw7ApKo0",
      "https://youtu.be/8U0sjHxYqrw",
      "https://youtu.be/rbZSi2Ju1_Q",
      "https://youtu.be/QCG8EbEO9DI",
      "https://youtu.be/c38_1E_esPc",
      "https://youtu.be/b1FinfVUp38",
      "https://youtu.be/9rg1GCeIYG8",
      "https://youtu.be/nKGWzCZJiuA",
      "https://youtu.be/DvT1v8WFkmI",
      "https://youtu.be/UwVVZPzo8iM",
      "https://youtu.be/XnVV65fck1g",
      "https://youtu.be/FEkUWMq4HyI",
      "https://youtu.be/QWbQ-h3_6tI",
      "https://youtu.be/opljrfGx7aU",
      "https://youtu.be/8BQcCI7rmIU",
      "https://youtu.be/1w-o9KMJYzY",
      "https://youtu.be/Ka89vyLH_aI",
      "https://youtu.be/SrkX9WYmBdU",
      "https://youtu.be/BEjwxz1OZsg"//198,
    ];

    if (!logsChannel) {
      var rand = vine[Math.floor(Math.random() * vine.length)];
      message.channel.send(rand);
    } else {
      var rand = vine[Math.floor(Math.random() * vine.length)];
      message.channel.send(rand);
      return logsChannel.send(`**${message.member.displayName}** asked for a vine,,,,WHAT A SMART COOKIE`);
    }
  }

  //important videos playlist basically and some other shit ppl sent me bc i asked for videos lmao https://www.youtube.com/playlist?list=PLFsQleAWXsj_4yDeebiIADdH5FMayBiJo
  if (mess.startsWith(prefix + "meme")) {
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

  //leave logs
  client.on('guildMemberRemove', member => {
    message.guild.channels.get('431647588262084608').send(`<@${member.user.id}> has left the server, what a fuckin loser lmao`);
    return logsChannel.send(`<@${member.user.id}> has left the server, what a fuckin loser lmao`);
  });

});