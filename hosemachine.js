const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const client = new Discord.Client({
  disableEveryone: true
});
client.commands = new Discord.Collection();

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

client.commands = new Discord.Collection();

var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

let prefix = config.prefix;
const discordToken = config.discordToken;

client.login(discordToken);

//on message in console and activity
client.on('ready', function () {
  console.log(`${client.user.username} is online!!!!! GET FUCKIN LIT BOIS`);
  client.user.setActivity("type ;)cowjoke, i dare u");
});

//member joins
client.on('guildMemberAdd', member => {
  member.guild.channels.get('431647588262084608').send(`<@${member.user.id}> just joined, i pray for their sanity tbh. anyways welcome to hell lmfao`).catch(err => console.log(err)); //join-leave-logs
  member.guild.channels.get('431636767448498178').send(`<@${member.user.id}> just joined, i pray for their sanity tbh. anyways welcome to hell lmfao`).catch(err => console.log(err)); //💾general💾
});

// //member leaves
client.on('guildMemberRemove', member => {
  member.guild.channels.get('431647588262084608').send(`<@${member.user.id}> just left, sucks for them. we're fun as FRICK`).catch(err => console.log(err)); //join-leave-logs
  member.guild.channels.get('431636767448498178').send(`<@${member.user.id}> just left, sucks for them. we're fun as FRICK`).catch(err => console.log(err)); //💾general💾
});

//role react settings
const yourID = "221116684864454657";
const setupCMD = "!roles"
let initialMessage = `react to what roles u want or u cant see anything else sry (im rly not, do what i said, u fucking bitch)`;
const roles = ["siege", "overwatch", "pubg", "csgo", "rocksmith", "minecraft"];
const reactions = ["483146133305294848", "483146167396335652", "483146201739296778", "483146328843485205", "483146363048296478", "483146383906439168"];

if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//message generation function
function generateMessages() {
  var messages = [];
  messages.push(initialMessage);
  for (let role of roles) messages.push(`react here to get the **"${role}"** role, u fucking pussy`);
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
          var gameRole = message.guild.roles.find('name', 'gaymer');

          if (event.t === "MESSAGE_REACTION_ADD") {
            let logsChannel = message.guild.channels.find(`name`, "bot-logs");

            memberObj.addRole(roleObj)
            memberObj.addRole(gameRole)
            // message.channel.send(`${memberObj} added ${roleObj}`);
            if(logsChannel) logsChannel.send(`${memberObj} added ${roleObj}`);
          } else {
            let logsChannel = message.guild.channels.find(`name`, "bot-logs");

            memberObj.removeRole(roleObj);
            // message.channel.send(`${memberObj} removed ${roleObj}`);
            if(logsChannel) logsChannel.send(`${memberObj} removed ${roleObj}`);
          }
        }
      }
    })
  }
});

client.on('message', function (message) {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("did u want an invite link? <https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot>");

  const mess = message.content.toLowerCase();
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let logsChannel = message.guild.channels.find(`name`, "bot-logs");

  let commandFile = client.commands.get(cmd);
  if (commandFile) commandFile.run(client, message, args);

  //role react
  if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {
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
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told <@${message.member.id}> to watch their FUCKIN language: heck`);
    }
  }

  if (mess.includes("hecc") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told <@${message.member.id}> to watch their FUCKIN language: hecc`);
    }
  }

  if (mess.includes("frick") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told <@${message.member.id}> to watch their FUCKIN language: frick`);
    }
  }

  if (mess.includes("darn") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told <@${message.member.id}> to watch their FUCKIN language: darn`);
    }
  }

  if (mess.includes("binch") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told <@${message.member.id}> to watch their FUCKIN language: binch`);
    }
  }

  //stupid reply shit for fun lmfao
  if (mess.includes("fuck me") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send(":weary: :ok_hand: :sweat_drops:");
    } else {
      message.channel.send(":weary: :ok_hand: :sweat_drops:");
      return logsChannel.send(`<@${message.member.id}> said fuck me,,,,:weary: :ok_hand: :sweat_drops:`);
    }
  }

  if (mess.includes("yeehaw") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("YAWHEE :cowboy: :cowboy: :cowboy:");
    } else {
      message.channel.send("YAWHEE :cowboy: :cowboy: :cowboy:");
      return logsChannel.send(`<@${message.member.id}> said yeehaw and got YAWHEE :cowboy: back`);
    }
  }

  if (mess.includes("whomst") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("the FUCK");
    } else {
      message.channel.send("the FUCK");
      return logsChannel.send(`<@${message.member.id}>... whoms't the FUCK`);
    }
  }

  if (mess.includes("kink") && message.member.id != client.user.id) {
    if (mess.includes(";)kinkshame") && message.member.id != client.user.id) {
      return;
    } else {
      if (!logsChannel) {
        message.channel.send("should i be kinkshaming u for this?");
      } else {
        message.channel.send("should i be kinkshaming u for this?");
        return logsChannel.send(`<@${message.member.id}> is PROBABLY going to be kinkshamed`);
      }
    }
  }

  if (mess.includes("knock knock") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("whos there?");
    } else {
      message.channel.send("whos there?");
      return logsChannel.send(`replied to <@${message.member.id}>: whos there?`);
    }
  }

  //stupid react shit for fun lmfao
  if (mess.includes("gay") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.react('🏳️‍🌈');
    } else {
      message.react('🏳️‍🌈');
      return logsChannel.send(`<@${message.member.id}> got a :gay_pride_flag:`);
    }
  }

  if (mess.includes("eyes emoji") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.react("👀");
    } else {
      message.react("👀");
      return logsChannel.send(`<@${message.member.id}> got :eyes:`);
    }
  }

  if (mess.includes("wet") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.react("💦");
    } else {
      message.react("💦");
      return logsChannel.send(`<@${message.member.id}> got :sweat_drops:`);
    }
  }
});