const  Discord = require('discord.js');
const TOKEN = require('./token.js');

var bot = new Discord.Client();

bot.on('ready', function(){
  console.log('ready to rock...');
});

bot.on('message', function(message){
  if(message.author.equals(bot.user)) return;
  if(message.content === "hello") {
    message.channel.sendMessage("Hello World!");
  }
});

bot.login(TOKEN);
