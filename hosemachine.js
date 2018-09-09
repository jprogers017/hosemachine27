const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
  disableEveryone: true
});
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
const generalChat = config.generalChat;
const myID = config.myID;
const rolesEmbed = new Discord.RichEmbed()
  .setTitle(`game roles`)
  .setDescription(`react to each role of the games u either own or play by clicking on the corresponding reaction`)
  .setColor(`#73b6ff`);

//role react settings
const setupCMD = `${prefix}createroles`;
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["siege", "overwatch", "pubg", "csgo", "rocksmith", "minecraft"];
const reactions = ["483146133305294848", "483146167396335652", "483146201739296778", "483146328843485205", "483146363048296478", "483146383906439168"];

//message generation function 
function generateMessages() {
  var messages = [];
  messages.push(initialMessage);
  for (let role of roles) messages.push(`React below to get the **"${role}"** role!`);
  return messages;
}

//add or remove reactions
client.on('raw', event => {
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {
    let channel = client.channels.get(event.d.channel_id);
    let message = channel.fetchMessage(event.d.message_id).then(msg => {
      let user = msg.guild.members.get(event.d.user_id);
      if (msg.author.id == client.user.id && msg.content != initialMessage) {
        var re = `\\*\\*"(.+)?(?="\\*\\*)`;
        var role = msg.content.match(re)[1];
        if (user.id != client.user.id) {
          var roleObj = msg.guild.roles.find('name', role);
          var memberObj = msg.guild.members.get(user.id);
          if (event.t === "MESSAGE_REACTION_ADD") {
            memberObj.addRole(roleObj);
            memberObj.addRole(msg.guild.roles.find('name', 'member'));
          } else {
            memberObj.removeRole(roleObj);
          }
        }
      }
    })
  }
});

//bot login
client.login(discordToken);

//on message in console and activity
client.on('ready', function () {
  console.log(`${client.user.username} is online in ${client.guilds.size} server(s)!`);
  client.user.setActivity(`type ${prefix}cowjoke, i dare u`);
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

client.on('message', function (message) {
  //variables
  const mess = message.content.toLowerCase();
  let messageArray = message.content.split(/ +/);
  let command = messageArray[0];
  let args = messageArray.slice(1);
  const serverLogs = client.channels.get(myServerLogs);
  const externalLogs = client.guilds.get(myServerID).channels.get(externalServerLogs);
  let commandFile = client.commands.get(command);
  if (commandFile) commandFile.run(client, message, args);

  //crashing? not on my watch
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    message.channel.send("did u want an invite link? <https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot>");
    let dmEmbed = new Discord.RichEmbed()
      .setDescription(`<@${message.author.id}> dm'd me :)\ni sent them my invite link!\n\n<https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot>`)
      .setColor(`#73b6ff`)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp();
    externalLogs.send(dmEmbed)
    return;
  }

  //role react
  if (message.author.id == myID && message.content.toLowerCase() == setupCMD && message.guild.id == myServerID) {
    var toSend = generateMessages();
    let mappedArray = [
      [toSend[0], false], ...toSend.slice(1).map((message, idx) => [message, reactions[idx]])
    ];
    for (let mapObj of mappedArray) {
      message.channel.send(mapObj[0]).then(sent => {
        if (mapObj[1]) {
          sent.react(mapObj[1]);
        }
      });
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

  if (mess.includes("press f to pay respects") && message.member.id != client.user.id) {
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
});