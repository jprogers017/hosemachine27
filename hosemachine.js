const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
  disableEveryone: true
});
const stupidMap = new Discord.Collection();
client.commands = new Discord.Collection();


//command handler
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("couldnt find commands");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded`);
    client.commands.set(props.help.name, props);
  });
});

//variables 
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const prefix = config.prefix;
const discordToken = config.discordToken;
const myServerID = config.myServerID;
const myServerLogs = config.myServerLogs;
const externalServerLogs = config.externalServerLogs;
const dmLogsChannel = config.dmLogsChannel;
const generalChat = config.generalChat;
const myID = config.myID;
const clientName = 'hosemachine (27)';
let clientStatuses = [
  `type ${prefix}cowjoke, i dare u`,
  `type ${prefix}cowjoke, i dare u`,
  `type ${prefix}cowjoke, i dare u`,
  `type ${prefix}cowjoke, i dare u`,
  `try "@${clientName} ?"`,
  `try "@${clientName} help"`,
  `try "${prefix}help"`
];
//role react settings
// const setupCMD = `${prefix}create roles`;
// const roles = ["siege", "overwatch", "pubg", "csgo", "rocksmith", "minecraft"];
// const reactions = ["siege", "overwatch", "pubg", "csgo", "rocksmith", "minecraft"];
// if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";
// var messageSent;

// //message generation function 
// function handleReact(messageReaction, user, remove) {
//   let message = messageReaction.message;
//   if (message.id != messageSent.id || user.id == messageSent.id) return;
//   var roleName = stupidMap.get(messageReaction.emoji.name);
//   var role = message.guild.roles.find('name', roleName);
//   var member = message.guild.members.get(user.id);
//   try {
//     if (remove) {
//       member.removeRole(role);
//     } else {
//       member.addRole(role);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// //add or remove reactions
// client.on('messageReactionAdd', (messageReaction, user) => handleReact(messageReaction, user));
// client.on('messageReactionRemove', (messageReaction, user) => handleReact(messageReaction, user, true));

//bot login
client.login(discordToken);

//on message in console and activity
client.on('ready', function () {
  console.log(`${client.user.username} is online in ${client.guilds.size} server(s)!`);
  setInterval(function () {
    let clientActivity = clientStatuses[Math.floor(Math.random() * clientStatuses.length)];
    client.user.setActivity(clientActivity);
  }, 8500)
});

//member joins
client.on('guildMemberAdd', member => {
  var joinEmbed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL)
    .setTitle(`welcome, ${member.user.username}!`)
    .setDescription(`hello, <@${member.user.id}>, please go to <#${config.rolesChannel}> and get ur <@&${config.memberRoleID}> role so u can see the rest on the server :weary:`)
    .setColor('#73bcff')
    .setTimestamp();
  if (member.guild.id == myServerID) {
    member.guild.channels.get(generalChat).send(joinEmbed);
  } else {
    return;
  }
});

//member leaves
client.on('guildMemberRemove', member => {
  var leaveEmbed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL)
    .setTitle(`goodbye :(`)
    .setDescription(`<@${member.user.id}> has left the server, see ya`)
    .setColor('#73bcff')
    .setTimestamp();
  if (member.guild.id == myServerID) {
    member.guild.channels.get(config.joinLeaveChannel).send(leaveEmbed);
    member.guild.channels.get(generalChat).send(leaveEmbed);
  } else {
    return;
  }
});

client.on('message', async function (message) {
  //variables
  const mess = message.content.toLowerCase();
  let messageArray = message.content.split(/ +/);
  let command = messageArray[0];
  let args = messageArray.slice(1);
  const serverLogs = client.channels.get(myServerLogs);
  const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
  const dmLogs = client.guilds.get(myServerID).channels.get(dmLogsChannel);
  const clientMention = message.guild.members.get(client.user.id);
  let help = new Discord.RichEmbed()
    .setColor("#73b6ff");
  if (message.member.nickname) {
    var authorName = message.member.nickname;
  } else {
    var authorName = message.author.username;
  }
  let logsEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle(message.author.tag)
    .addField('channel:', message.channel.name)
    .setColor(message.member.displayHexColor)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp();
  let commandFile = client.commands.get(command);
  if (commandFile) commandFile.run(client, message, args, authorName, logsEmbed, help);

  //crashing? not on my watch
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    message.channel.send("did u want an invite link? <https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot>");
    let dmLogEmbed = new Discord.RichEmbed()
      .setAuthor(`direct message content:`, message.author.displayAvatarURL)
      .setDescription(`**From: <@${message.author.id}>**\n"${message.content}"\n\nan invite link was also sent : )`)
      .setColor(`#73b6ff`)
      .setTimestamp();
    dmLogs.send(dmLogEmbed);
    return;
  }

  // //role react
  // if (/*message.author.id == myID && */message.content.toLowerCase() == setupCMD && message.guild.id == myServerID) {
  //   let toSend = new Discord.RichEmbed()
  //     .setTitle(`game roles`)
  //     .setDescription(`react to each role of the games u either own or play by clicking on the corresponding reaction`)
  //     .setColor(`#73b6ff`);
  //   for (let i = 0; i < reactions.length; i++) stupidMap.set(reactions[i], roles[i]);
  //   message.channel.send(toSend).then(sent => {
  //     messageSent = sent;
  //     stupidMap.forEach((value, key, map) => {
  //       var reactWith = key;
  //       if (key.substring(0, 1) != "\\") reactWith = message.guild.emojis.find('name', key);
  //       sent.react(reactWith);
  //     });
  //   });
  // }

  //help command BC I WANT IT OUT OF MY COMMANDS FOLDER BC IDK BC I CAN OK
  if (mess.startsWith(`${prefix}help`) || mess.startsWith(`${clientMention} ?`) || mess.startsWith(`${clientMention} help`)) {
    let helpEmbed = new Discord.RichEmbed()
      .setAuthor(`${client.user.username}'s help page! u need help, ${authorName}?`, message.author.avatarURL, 'https://github.com/jprogers017/hosemachine27')
      .setTitle(`usage: ${prefix}command *<required>, [optional]*`)
      .setDescription(`[click here for my github!](https://github.com/jprogers017/hosemachine27)\n[click here for my server invitation link!](https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot)\ni have a bunch of auto-reply features!!!\na..."swear" filter? it doesnt actually, it just tells u to stop fucking swearing if u say heck or something like it\nsometimes i react to words with emojis\nDAD JOKES DAD JOKES DAD JOKES DAD JOKES DAD JOKES DAD JOKES DAD JOKES DAD JOKES`)
      .setColor(message.member.displayHexColor)
      .setFooter(`UNDER CONSTRUCTION: for command specific help, do the command with "?" afterwards, for example, ${prefix}hello ?`, );
    client.commands.forEach(c => {
      helpEmbed.addField(`${c.help.name}`, `${c.help.description}\n*usage: ${c.help.usage}*`);
    });
    message.channel.send(helpEmbed);
    const logContent = `<@${message.member.id}> asked for help!`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  //joke filter
  if (mess.includes("heck") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: heck`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("hecc") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: hecc`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("frick") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: frick`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("darn") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: darn`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("dang") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: dang`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("binch") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: binch`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  //stupid reply shit for fun lmfao
  if (mess.includes("fuck me") && message.member.id != client.user.id) {
    message.channel.send(":weary: :ok_hand: :sweat_drops:");
    const logContent = `told <@${message.member.id}> got :weary: :ok_hand: :sweat_drops:`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("yeehaw") && message.member.id != client.user.id) {
    message.channel.send("YAWHEE :cowboy: :cowboy: :cowboy:");
    const logContent = `<@${message.member.id}> got YAWHEE :cowboy: :cowboy: :cowboy:`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("whomst") && message.member.id != client.user.id) {
    message.channel.send("the FUCK");
    const logContent = `<@${message.member.id}> : WHOMST THE FUCK`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if ((mess.includes(" f to pay ") || mess.includes(" get an f ")) && message.member.id != client.user.id) {
    message.channel.send("F");
    const logContent = `<@${message.member.id}> paid their respects`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("kink") && message.member.id != client.user.id) {
    if (mess.includes(`${prefix}kinkshame`) && message.member.id != client.user.id) {
      return;
    } else {
      message.channel.send("should i be kinkshaming u for this?");
      const logContent = `<@${message.member.id}> might be getting kinkshamed :eyes:`;
      let logsEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();
      if (message.guild.id == config.myServerID) {
        serverLogs.send(logsEmbed);
      } else {
        logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        externalLogs.send(logsEmbed);
      }
    }
  }

  if (mess.includes("knock knock") && message.member.id != client.user.id) {
    message.channel.send("whos there?");
    const logContent = `<@${message.member.id}> said knock knock !!!`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  //stupid react shit for fun lmfao
  if (mess.includes("gay") && message.member.id != client.user.id) {
    message.react('🏳️‍🌈');
    const logContent = `<@${message.member.id}> got a :gay_pride_flag: !!!`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("eyes emoji") && message.member.id != client.user.id) {
    message.react("👀");
    const logContent = `<@${message.member.id}> got :eyes:`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("wet") && message.member.id != client.user.id) {
    message.react("💦");
    const logContent = `<@${message.member.id}> got some :sweat_drops:`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

  //dad JOKES BOIS HERE WE FUCKIN GO
  if (mess.startsWith("im ") || mess.startsWith("i'm ") || mess.startsWith("i am ")) {
    let dadJoke = '';
    let user = message.mentions.users;
    if (mess.startsWith("i am ")) {
      dadJoke = message.cleanContent.split(" ").slice(2);
    } else if (args[0] === "tler") {
      return message.channel.send("shut the fuck up, millie");
    } else {
      dadJoke = message.cleanContent.split(" ").slice(1);
    }
    return message.channel.send(`hi ${dadJoke}, i'm ${client.user.username} :)`);
    const logContent = `<@${message.member.id}> made it REAL easy for me to make a dad joke lmaoooooo`;
    let logsEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(logContent)
      .addField('channel:', message.channel.name)
      .setColor(message.member.displayHexColor)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    if (message.guild.id == config.myServerID) {
      serverLogs.send(logsEmbed);
    } else {
      logsEmbed.addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
      externalLogs.send(logsEmbed);
    }
  }

});