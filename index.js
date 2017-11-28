const  Discord = require('discord.js');

const TOKEN = require('./token.js');
const PREFIX = 'd!';
const VERSION = '1.0.0';
const GITHUB = 'https://github.com/mjkatgithub/d-bot'

//I know its a dirty hack but it works
const BACKTICK ='`'

//let's do it this way for now
let help = 'These are the commands Foo knows\n**d!hello** greets you with your name\n**d!ping** try it\n**d!8ball** ask a question that can be answered with yes or no\n**d!help** shows this help\n**d!info** shows general infos about D-Bot';

var fortunes = [
  'yes',
  'no',
  'yo',
  'nes',
];

let bot = new Discord.Client();

bot.on('ready', () => {
  console.log('ready to rock...');
});

bot.on('message', message => {
  if(message.author.equals(bot.user)) return;
  if(!message.content.startsWith(PREFIX)) return;

  let args = message.content.substring(PREFIX.length).split(' ');

  switch(args[0].toLowerCase()) {
    case 'ping':
      message.channel.sendMessage('pong!');
      break;
    case 'info':
      message.channel.sendMessage('This is the D-Bot!');
      break;
    case '8ball':
      if(args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.sendMessage('what?!');
      break;
    default:
      message.channel.sendMessage('Invalid command!');
      break;
  }

});

bot.login(TOKEN);
