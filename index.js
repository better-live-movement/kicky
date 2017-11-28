const  Discord = require('discord.js');
const TOKEN = require('./token.js');
const PREFIX = 'd!';

var fortunes = [
  'foo',
  'bar',
  'baz'
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
