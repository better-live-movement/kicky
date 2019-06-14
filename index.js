const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const Informer = require('./modules/Informer');
const Fun = require('./modules/Fun');
const Anno = require('./modules/anno');

const TOKEN = require('./token.js');
const CONFIG = require('./config.json');

const PREFIX = CONFIG.prefix;

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

let bot = new Discord.Client();

var servers = {};

bot.on('ready', async () => {
  bot.user.setPresence({
    game: {
      name: `${PREFIX}info | ${PREFIX}help`
    },
    status: 'idle'})
  .then(console.log)
  .catch(console.error);
  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
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
  if(!message.content.startsWith(PREFIX)) return;
  console.log("----------------------------------------------------------------------------------------------------------------------------");
  console.log(message);

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
        let informer = new Informer(message, bot.user.avatarURL);
        informer.respond();
      break;
    case 'anno':
<<<<<<< HEAD
      if (message.guild.channels.find('name', 'announcements')){
        message.guild.channels.find('name', 'announcements').send(`@everyone Version ${VERSION} is alive!!!`);
      }else{
        message.channel.send('nope');
      }
=======
      let announcer = new Anno(message);
      announcer.announce();
>>>>>>> cleanup index
      break;
    case 'setrole':
      if(msgArray[1]){
        console.log('setrole has arguments');
      }
      break;
    case 'removerole':
      if(msgArray[1] && msgArray[2]){
        let member = message.guild.members.find("displayName", msgArray[1])
        if(member){
          let role = message.guild.roles.find("name", msgArray[2])
          if(role){
            member.removeRole(role);
            message.channel.send('role ' + role + ' removed from member ' + member.displayName);
          }
          else{
            message.channel.send('member not found');
            console.log('member ', msgArray[1], ' not found');
          }
        }
        else{
          message.channel.send('member not found');
          console.log('member ', msgArray[1], ' not found');
        }
      }
      else{
        message.channel.send('member or role is missing');
      }
      break;
    case 'deleterole':
      message.guild.roles.find("name", "noob").delete();
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
    default:
      message.channel.send('***Invalid command!***');
      message.channel.send(help);
      break;
  }

});

bot.login(TOKEN);
