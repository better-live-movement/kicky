const  Discord = require('discord.js');

const TOKEN = require('./token.js');
const PREFIX = 'd!';
const VERSION = '2.0.0';
const SUPPORT = 'https://cnhv.co/1gdf0'
const MINER = 'https://authedmine.com/media/miner.html?key=ROY9SbXSoyHawmn0RptMs0kapTJ0e7zV'

//I know its a dirty hack but it works
const BACKTICK ='`'

//let's do it this way for now
let help = 'These are the commands D-Bot knows\n**d!hello** greets you with your name\n**d!ping** try it\n**d!8ball** ask a question that can be answered with yes or no\n**d!help** shows this help\n**d!info** shows general infos about D-Bot\n\nFor support visit https://cnhv.co/1gdf0';

var fortunes = [
  'yes',
  'no',
  'yo',
  'nes',
];

let bot = new Discord.Client();

bot.on('ready', () => {
  bot.user.setGame(`${PREFIX}help`)
  console.log('ready to rock...');
});

bot.on('message', message => {
  if(message.author.equals(bot.user)) return;
  if(!message.content.startsWith(PREFIX)) return;

  let args = message.content.substring(PREFIX.length).split(' ');

  switch(args[0].toLowerCase()) {
    case 'hello':
      message.channel.sendMessage('Hello ' + message.author.toString() + '!');
      break;
    case 'ping':
      message.channel.sendMessage('pong!');
      break;
    case 'help':
      message.channel.sendMessage(help);
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
      message.channel.sendMessage(infoCard);
      break;
    case '8ball':
      if(args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.sendMessage('what?!');
      break;
    default:
      message.channel.sendMessage('***Invalid command!***');
      message.channel.sendMessage(help);
      break;
  }

});

bot.login(TOKEN);
