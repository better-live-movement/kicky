const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const TOKEN = require('./token.js');
const CONFIG = require('./config.json');
const PREFIX = 'k!';
const VERSION = '3.0.0';
const INVITE = 'https://discordapp.com/api/oauth2/authorize?client_id=384572972851265538&permissions=8&scope=bot';
const SUPPORT = 'https://discord.gg/6VpxTbY';
const MINER = 'https://authedmine.com/media/miner.html?key=ROY9SbXSoyHawmn0RptMs0kapTJ0e7zV';
const DASHBOARD = 'https://kicky-home.herokuapp.com/';

//I know its a dirty hack but it works
const BACKTICK ='`'

//let's do it this way for now
let help = 'These are the commands Kicky knows\n**k!hello** greets you with your name\n**k!ping** try it\n**k!8ball** ask a question that can be answered with yes or no\n**k!help** shows this help\n**k!info** shows general infos about D-Bot\n**k!play <youtubelink>**kicky plays the song (you have to be in a voice channel)\n\nFor support visit https://discord.gg/6VpxTbY';

function play(connection, message){
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
  server.queue.shift();
  server.dispatcher.on("end", () => {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

let fortunes = [
  'Yes!',
  'No!',
  'Maybe!',
  'Yeah, well, whatever...',
];

function generateHex(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

let bot = new Discord.Client();

var servers = {};

bot.on('ready', async () => {
  bot.user.setGame(`${PREFIX}info | ${PREFIX}help`)
  console.log('ready to rock...');
  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
});

let greeter = false;

bot.on('guildMemberAdd', member => {
  if (member.guild.channels.find('name', 'general') && greeter) {
    try {
      member.guild.channels.find('name', 'general').send('Welcome ' + member.toString());
    } catch (e) {
      console.log(e.stack);
    }
  } else {
    if (member.guild.channels.find('name', 'welcome') && greeter) {
      try {
        member.guild.channels.find('name', 'welcome').send('Welcome ' + member.toString());
      } catch (e) {
        console.log(e.stack);
      }
    }
  }

  if(CONFIG.setNewbieRole) {
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

  let args = message.content.substring(PREFIX.length).split(' ');

  switch(args[0].toLowerCase()) {
    case 'hello':
      message.channel.send('Hello ' + message.author.toString() + '!');
      break;
    case 'ping':
      message.channel.send('pong!');
      break;
    case 'help':
      message.channel.send(help);
      break;
    case 'info':
      let infoCard = new Discord.RichEmbed()
        .setTitle('Kicky')
        .setURL(SUPPORT)
        .setColor(0x1a81cd)
        .setThumbnail(bot.user.avatarURL)
        .addField('Version', VERSION)
        .addField('Help', `Use ${BACKTICK}${PREFIX}help${BACKTICK} for a list of commands`)
        .addField('Invite', `[Invite](${INVITE}) the bot to your server.`)
        .addField('Server', `Click [here](${SUPPORT}) to visit the discord server.`)
        .addField('Website', `Click [here](${DASHBOARD}) to visit the Website.`)
        .addField('donate', `Feel free to donate by running [this](${MINER}) miner.`)
        .setFooter(`I had / have fun writing this bot. I hope you enjoy using it.`)
      message.channel.send(infoCard);
      break;
    case '8ball':
      if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.send('what?!');
      break;
    case 'anno':
      message.guild.channels.find('name', 'announcements').send(`@everyone Version ${VERSION} is alive!!!`);
      break;
    case 'setrole':
      if(args[1]){
        console.log('setrole has arguments');
      }
      break;
    case 'removerole':
      if(args[1] && args[2]){
        let member = message.guild.members.find("displayName", args[1])
        if(member){
          let role = message.guild.roles.find("name", args[2])
          if(role){
            member.removeRole(role);
            message.channel.send('role ' + role + ' removed from member ' + member.displayName);
          }
          else{
            message.channel.send('member not found');
            console.log('member ', args[1], ' not found');
          }
        }
        else{
          message.channel.send('member not found');
          console.log('member ', args[1], ' not found');
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
      if (!args[1]) {
        message.channel.send('please provide a link!');
        return;
      }
      if (!message.member.voiceChannel) {
        message.channel.send('You musst be in a voice channel!');
        return;
      }
      if (!servers[message.guild.id]) servers[message.guild.id] = {queue: []};
      var server = servers[message.guild.id];
      server.queue.push(args[1]);
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
