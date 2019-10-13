const Discord = require('discord.js');
const mongoose = require('mongoose');
//const Guild = require('./models/guild');
const GuildController = require('./controllers/guild');

const YTDL = require('ytdl-core');

const Informer = require('./modules/Informer');
const Fun = require('./modules/Fun');
const Anno = require('./modules/anno');

const Roler = require('./modules/Roler');

const TOKEN = require('./token.js');
const CONFIG = require('./config.json');

const PREFIX = CONFIG.prefix;
const DEFAULT_PREFIX = "k!";

function play(connection, message){
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
  server.queue.shift();
  server.dispatcher.on("end", () => {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}


function generateHex(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function execCmd(message, config){
  //soon tm
}

let bot = new Discord.Client();

var servers = {};

bot.on('ready', async () => {
  bot.user.setPresence({
    game: {
      name: `${DEFAULT_PREFIX}info | ${DEFAULT_PREFIX}help`
    },
    status: 'dnd'})
  .then(console.log)
  .catch(console.error);
  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
});

//conect to DB
mongoose.connect(
  'mongodb://' +
  process.env.USER + ':' +
  process.env.PASSWD +
  '@kickybot-shard-00-00-sjo1k.mongodb.net:27017/' +
  process.env.DB +
  '?ssl=true&replicaSet=KickyBot-shard-0&authSource=admin',
  {
    useNewUrlParser: true,
    dbName: process.env.DB,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log('\nconnected to database ', process.env.DB, '\n')
}).catch(error => {
  console.log(error);
});
mongoose.Promise = global.Promise;

bot.on('guildCreate', (guild) => {
  console.log(bot.user.username + " was invited to and joined " + guild.name);
  GuildController.add_guild(guild.id);
});

bot.on('guildDelete', (guild) => {
  GuildController.remove_guild(guild.id);
});

let greeter = false;

bot.on('guildMemberAdd', member => {
  if (member.guild.channels.find('name', 'welcome') && (greeter || member.guild.id == "403675414272147457")) {
    try {
      const ch = member.guild.channels.find('name', 'welcome');
      ch.send('Hey ' + member.toString() +'! Welcome to my home! Please read the #rules before posting anything.');
    } catch (e) {
      console.log(e.stack);
    }
  } else {
    if (member.guild.channels.find('name', 'general') && (greeter || member.guild.id == "403675414272147457")) {
      try {
        member.guild.channels.find('name', 'general').send('Welcome ' + member.toString());
      } catch (e) {
        console.log(e.stack);
      }
    }
  }

  if(CONFIG.setNewbieRole || member.guild.id == "403675414272147457") {
    if(member.guild.roles.find("name", CONFIG.newbieRole)){
      member.addRole(member.guild.roles.find("name", CONFIG.newbieRole));
    }
    else {
      console.log("role not found! I'll create it!");
      member.guild.createRole({
        name: CONFIG.newbieRole,
        color: generateHex(),
        permissions: [],
        hoist: true
      }).then(function(role) {
        member.addRole(role);
      });
    }
  }

});

bot.on('message', message => {
  if(message.author.equals(bot.user)) return;

  GuildController.get_config(message.channel.guild.id, (err, config) => {
    if(err){
      console.error(err);
    } else if (!config) {
      message.channel.send('No config found for this Guild. Try again.');
      GuildController.add_guild(message.channel.guild.id);
    } else {
      execCmd(message, config);
    }
  });

  if(!message.content.startsWith(PREFIX)) return;
  console.log("----------------------------------------------------------------------------------------------------------------------------");
  console.log(message.content);

  msgArray = message.content.substring(PREFIX.length).split(' ');
  let module = msgArray[0].toLowerCase();
  let command;
  let args;
  if(msgArray[1]) {
    command = msgArray[1].toLowerCase();
  }
  if(msgArray[2]) {
    args =msgArray.slice(2);
  }
  let informer = new Informer(message, bot.user.avatarURL);
  switch(module) {
    case 'hello':
    case 'ping':
    case '8ball':
      let funComander = new Fun(message);
      command = msgArray[0].toLowerCase();
      args =msgArray.slice(1);
      funComander.command(command, args);
      break;
    case 'help':
    case 'info':
        informer.respond();
      break;
    case 'anno':
      let announcer = new Anno(message);
      announcer.announce();
      break;
    case 'play':
      if (!msgArray[1]) {
        message.channel.send('please provide a link!');
        return;
      }
      if (!message.member.voiceChannel) {
        message.channel.send('You musst be in a voice channel!');
        return;
      }
      if (!servers[message.guild.id]) servers[message.guild.id] = {queue: []};
      var server = servers[message.guild.id];
      server.queue.push(msgArray[1]);
      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection => {
        play(connection, message);
      });
      break;
    case 'skip':
      var server = servers[message.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      break;
    case 'stop':
      if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
      break;
    case 'add_role':
    case 'delete_role':
    case 'assign_role':
    case 'revoke_role':
      let rolingStuff = new Roler(message);
      rolingStuff.manage(message);
      break;
    default:
      message.channel.send('***Invalid command!***');
      message.channel.send(informer.help());
      break;
  }

});

bot.login(TOKEN);
