const Discord = require('discord.js');
const TOKEN = require('./token.js');
const CONFIG = require('./config.json');
const PREFIX = 'd!';
const VERSION = '2.0.2';
const INVITE = 'https://discordapp.com/api/oauth2/authorize?client_id=384572972851265538&scope=bot&permissions=1'
const SUPPORT = 'https://cnhv.co/1gdf0'
const MINER = 'https://cnhv.co/1iih5'

//I know its a dirty hack but it works
const BACKTICK ='`'

//let's do it this way for now
let help = 'These are the commands D-Bot knows\n**d!hello** greets you with your name\n**d!ping** try it\n**d!8ball** ask a question that can be answered with yes or no\n**d!help** shows this help\n**d!info** shows general infos about D-Bot\n\nFor support visit https://cnhv.co/1gdf0';

let fortunes = [
  'yes',
  'no',
  'yo',
  'nes',
];

function generateHex(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

let bot = new Discord.Client();

bot.on('ready', () => {
  bot.user.setGame(`${PREFIX}help`)
  console.log('ready to rock...');
});

bot.on('guildMemberAdd', member => {
  member.guild.channels.find('name', 'general').send('Welcome ' + member.toString());

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
        .setTitle('D-Bot')
        .setURL(SUPPORT)
        .setColor(0x1a81cd)
        .setThumbnail(bot.user.avatarURL)
        .addField('Version', VERSION)
        .addField('Help', `Use ${BACKTICK}${PREFIX}help${BACKTICK} for a list of commands`)
        .addField('Invite', `[Invite](${INVITE}) the bot to your server.`)
        .addField('Server', `Click [here](${SUPPORT}) to visit the discord server.`)
        .addField('donate', `Feel free to donate by running [this](${MINER}) miner.`)
        .setFooter(`I had / have fun writing this bot. I hope you enjoy using it.`)
      message.channel.send(infoCard);
      break;
    case '8ball':
      if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.send('what?!');
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
    default:
      message.channel.send('***Invalid command!***');
      message.channel.send(help);
      break;
  }

});

bot.login(TOKEN);
