const Discord = require('discord.js');

const TOKEN = require('./token.js');
const PREFIX = 'd!';
const VERSION = '2.0.2';
const SUPPORT = 'https://cnhv.co/1gdf0'
const MINER = 'https://authedmine.com/media/miner.html?key=ROY9SbXSoyHawmn0RptMs0kapTJ0e7zV'

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
  member.guild.channels.find('name', 'general').send('welcome ' + member.toString());

  if(member.guild.roles.find("name", "noob")){
    member.addRole(member.guild.roles.find("name", "noob"));
  }
  else {
    console.log("role not found! I'll create it!");
    member.guild.createRole({
      name: "noob",
      color: generateHex(),
      permissions: [],
      hoist: true
    }).then(function(role) {
      member.addRole(role);
    });
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
        .addField('Server', 'For more info and support click on the title to visit the discord server.')
        .setFooter(`Feel free to donate by running this miner: ${MINER}`)
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
