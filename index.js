const  Discord = require('discord.js');
const TOKEN = require('./token.js');

var bot = new Discord.Client();

bot.on("message", function(message){
  console.log(message.content);
});

bot.login(TOKEN);
