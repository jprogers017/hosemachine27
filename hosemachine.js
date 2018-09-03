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
const prefix = config.prefix; //prefix
const discordToken = config.discordToken; //token for login
const myServerID = config.myServerID; //for bot logs
const myServerLogs = config.myServerLogs; //for bot's logs (my server)
const externalServerLogs = config.externalServerLogs; //for bot's logs (other servers)
const joinLeaveChannel = config.joinLeaveChannel; //for join leave logs
const generalChat = config.generalChat; //for join leave logs
//role react variables and settings
const myID = config.myID;
const setupCMD = "!roles"
const initialMessage = `react to what roles u want or u cant see anything else sry (im rly not, pls keep it organized!!!)`;
const roles = ["siege", "overwatch", "pubg", "csgo", "rocksmith", "minecraft"];
const reactions = ["483146133305294848", "483146167396335652", "483146201739296778", "483146328843485205", "483146363048296478", "483146383906439168"];
//roles + reactions length check
if (roles.length !== reactions.length) throw "roles and reactions length";

//bot login
client.login(discordToken);

//on message in console and activity
client.on('ready', function () {
  console.log(`${client.user.username} is online in ${client.guilds.size} server(s)!`);
  client.user.setActivity(`type ${prefix}cowjoke, i dare u`);
});

//member joins
client.on('guildMemberAdd', member => {
  if (member.guild.id == myServerID) {
    // member.guild.channels.get(joinLeaveChannel).send(`<@${member.user.id}> just joined the server!!! hello!!!!!`).catch(err => console.log(err));
    member.guild.channels.get(generalChat).send(`<@${member.user.id}> just joined the server!!! hello!!!!!`).catch(err => console.log(err));
  } else {
    return;
  }
});

//member leaves
client.on('guildMemberRemove', member => {
  if (member.guild.id == myServerID) {
    member.guild.channels.get(joinLeaveChannel).send(`<@${member.user.id}> just left, :(`).catch(err => console.log(err));
    member.guild.channels.get(generalChat).send(`<@${member.user.id}> just left, :(`).catch(err => console.log(err));
  } else {
    return;
  }
});

//message generation function
function generateMessages() {
  var messages = [];
  messages.push(initialMessage);
  for (let role of roles) messages.push(`react here to get the **"${role}"** role!!!`);
  return messages;
}

//add the role after user reacts
client.on('raw', event => {
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {
    let channel = client.channels.get(event.d.channel_id);
    let message = channel.fetchMessage(event.d.message_id).then(message => {
      let user = message.guild.members.get(event.d.user_id);

      if (message.author.id == client.user.id && message.content != initialMessage) {

        var re = `\\*\\*"(.+)?(?="\\*\\*)`;
        var role = message.content.match(re)[1];

        if (user.id != client.user.id) {
          var memberObj = message.guild.members.get(user.id);
          var roleObj = message.guild.roles.find('name', role);
          var memberRole = message.guild.roles.find('name', 'member');

          if (event.t === "MESSAGE_REACTION_ADD") {
            const serverLogs = client.channels.get(myServerLogs);

            memberObj.addRole(roleObj)
            memberObj.addRole(memberRole)
            if (message.guild.id == myServerID) {
              const logContent = `${memberObj} added ${roleObj}`;
              let logsEmbed = new Discord.RichEmbed()
                .setDescription(logContent)
                .addField('channel:', message.channel.name)
                .setColor(message.member.displayHexColor)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp();

              serverLogs.send(logsEmbed);
            }
          } else {
            const serverLogs = client.channels.get(myServerLogs);

            memberObj.removeRole(roleObj);
            if (message.guild.id == myServerID) {
              const logContent = `${memberObj} removed ${roleObj}`;
              let logsEmbed = new Discord.RichEmbed()
                .setDescription(logContent)
                .addField('channel:', message.channel.name)
                .setColor(message.member.displayHexColor)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp();

              serverLogs.send(logsEmbed);
            }
          }
        }
      }
    })
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
  if ((message.author.id == myID) && (message.content.toLowerCase() == setupCMD) && (message.guild.id == myServerID)) {
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
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("hecc") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: hecc`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("frick") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: frick`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("darn") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: darn`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("dang") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: dang`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("binch") && message.member.id != client.user.id) {
    message.channel.send("watch ur FUCKIN language");
    const logContent = `told <@${message.member.id}> to watch their FUCKIN language: binch`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  //stupid reply shit for fun lmfao
  if (mess.includes("fuck me") && message.member.id != client.user.id) {
    message.channel.send(":weary: :ok_hand: :sweat_drops:");
    const logContent = `told <@${message.member.id}> got :weary: :ok_hand: :sweat_drops:`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("yeehaw") && message.member.id != client.user.id) {
    message.channel.send("YAWHEE :cowboy: :cowboy: :cowboy:");
    const logContent = `<@${message.member.id}> got YAWHEE :cowboy: :cowboy: :cowboy:`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("whomst") && message.member.id != client.user.id) {
    message.channel.send("the FUCK");
    const logContent = `<@${message.member.id}> : WHOMST THE FUCK`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("yeehaw") && message.member.id != client.user.id) {
    message.channel.send("YAWHEE :cowboy: :cowboy: :cowboy:");
    const logContent = `<@${message.member.id}> got YAWHEE :cowboy: :cowboy: :cowboy:`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("press f to pay respects") && message.member.id != client.user.id) {
    message.channel.send("F");
    const logContent = `<@${message.member.id}> paid their respects`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("kink") && message.member.id != client.user.id) {
    if (mess.includes(`${prefix}kinkshame`) && message.member.id != client.user.id) {
      return;
    } else {
      message.channel.send("should i be kinkshaming u for this?");
      const logContent = `<@${message.member.id}> might be getting kinkshamed :eyes:`;
      if (message.guild.id == myServerID) {
        let logsEmbed = new Discord.RichEmbed()
          .setDescription(logContent)
          .addField('channel:', message.channel.name)
          .setColor(message.member.displayHexColor)
          .setThumbnail(message.author.avatarURL)
          .setTimestamp();

        serverLogs.send(logsEmbed);
      } else {
        let logsEmbed = new Discord.RichEmbed()
          .setDescription(logContent)
          .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
          .addField('channel:', message.channel.name, true)
          .setColor(message.member.displayHexColor)
          .setThumbnail(message.author.avatarURL)
          .setTimestamp();

        externalLogs.send(logsEmbed);
      }
    }
  }

  if (mess.includes("knock knock") && message.member.id != client.user.id) {
    message.channel.send("whos there?");
    const logContent = `<@${message.member.id}> said knock knock !!!`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  //stupid react shit for fun lmfao
  if (mess.includes("gay") && message.member.id != client.user.id) {
    message.react('🏳️‍🌈');
    const logContent = `<@${message.member.id}> got a :gay_pride_flag: !!!`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("eyes emoji") && message.member.id != client.user.id) {
    message.react("👀");
    const logContent = `<@${message.member.id}> got :eyes:`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }

  if (mess.includes("wet") && message.member.id != client.user.id) {
    message.react("💦");
    const logContent = `<@${message.member.id}> got some :sweat_drops:`;
    if (message.guild.id == myServerID) {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('channel:', message.channel.name)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      serverLogs.send(logsEmbed);
    } else {
      let logsEmbed = new Discord.RichEmbed()
        .setDescription(logContent)
        .addField('server (owner):', `${message.guild.name} (${message.guild.owner})`, true)
        .addField('channel:', message.channel.name, true)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp();

      externalLogs.send(logsEmbed);
    }
  }
});