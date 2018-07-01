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
  console.log(`${client.user.username} is online in ${client.guilds.size} server(s)`);
  client.user.setActivity("type ;)cowjoke, i dare u");
});

client.on('message', function (message) {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("did u want an invite link? <https://discordapp.com/api/oauth2/authorize?client_id=433064995274883078&permissions=0&scope=bot>");

  const mess = message.content.toLowerCase();
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let logsChannel = message.guild.channels.find(`name`, "bot-logs");

  let commandFile = client.commands.get(cmd.slice(prefix.length));
  if (commandFile) commandFile.run(client, message, args);

  //joke filter
  if (mess.includes("heck") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: heck`);
    }
  }

  if (mess.includes("frick") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: frick`);
    }
  }

  if (mess.includes("darn") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: darn`);
    }
  }

  if (mess.includes("binch") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("watch ur FUCKIN language");
    } else {
      message.channel.send("watch ur FUCKIN language");
      return logsChannel.send(`told **${message.member.displayName}** to watch their FUCKIN language: binch`);
    }
  }

  //stupid reply shit for fun lmfao
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

  if (mess.includes("whomst") && message.member.id != client.user.id) {
    if (!logsChannel) {
      message.channel.send("the FUCK");
    } else {
      message.channel.send("the FUCK");
      return logsChannel.send(`**${message.member.displayName}**... whoms't the FUCK`);
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
        return logsChannel.send(`**${message.member.displayName}** is PROBABLY going to be kinkshamed`);
      }
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
});