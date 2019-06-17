const Discord = require('discord.js');

const CONFIG = require('../config.json');
const VERSION = '3.0.2';

const INVITE = 'https://discordapp.com/api/oauth2/authorize?client_id=384572972851265538&permissions=8&scope=bot';
const SUPPORT = 'https://discord.gg/6VpxTbY';
const DONATE ='https://brave.com/bet307';
const DASHBOARD = 'https://better-live-movement.github.io/kicky/';
//let's do it this way for now
const AVATAR = 'https://cdn.discordapp.com/avatars/405516819672203274/57c31366b8622443bc0b776ffdaf779c.png?size=2048';

//I know it's still a dirty hack but it works and I like it! So go fuck your self!! ;-)
const BACKTICK ='`'

//old help
//let help = 'These are the commands Kicky knows\n**k!hello** greets you with your name\n**k!ping** try it\n**k!8ball** ask a question that can be answered with yes or no\n**k!help** shows this help\n**k!info** shows general infos about Kicky\n**k!play <youtubelink>**kicky plays the song (you have to be in a voice channel)\n\nFor support visit https://discord.gg/6VpxTbY';

let infoCard = new Discord.RichEmbed()
  .setTitle('Kicky')
  .setURL(SUPPORT)
  .setColor(0x1a81cd)
  .setThumbnail(AVATAR)
  .setDescription('kicky is a multipurpose discord bot.')
  .addField('Version', VERSION)
  .addField('Help', `Use ${BACKTICK}${CONFIG.prefix}help${BACKTICK} for a list of commands`)
  .addField('Invite', `[Invite](${INVITE}) the bot to your server.`)
  .addField('Server', `Click [here](${SUPPORT}) to visit the discord server.`)
  .addField('Website', `Click [here](${DASHBOARD}) to visit the Website.`)
  .addField('donate', `To support us give the new Brave Browser a try using [this](${DONATE}) link.`)
  .setFooter(`I had / have fun writing this bot. I hope you enjoy using it.`)

let generalHelp = new Discord.RichEmbed()
  .setTitle('Help')
  .setColor(0x1a81cd)
  .setThumbnail(AVATAR)
  .setDescription('This is the general help. Kicky is organised in modules and every module have its own help.')
  .addField(`${CONFIG.prefix}help`, 'shows this help')
  .addField(`${CONFIG.prefix}info`, 'shows general infos about Kicky')
  .addField(`${CONFIG.prefix}help music`, 'shows help about music commands')
  .addField(`${CONFIG.prefix}help fun`, 'shows help about some fun stuff')
  .setFooter(`for support visit the discord server(${SUPPORT}).`)

let funHelp = new Discord.RichEmbed()
  .setTitle('Fun')
  .setColor(0x1a81cd)
  .setThumbnail(AVATAR)
  .setDescription("this are some fun commands Kicky knows")
  .addField(`${CONFIG.prefix}hello`,'greets you with your name')
  .addField(`${CONFIG.prefix}ping`, 'try it ;-)')
  .addField(`${CONFIG.prefix}8ball <your question>`, 'ask a question that can be answered with yes or no')
  .setFooter(`for support visit the discord server(${SUPPORT}).`)

  let musicHelp = new Discord.RichEmbed()
  .setTitle('Music Help')
  .setColor(0x1a81cd)
  .setThumbnail(AVATAR)
  .setDescription("this are the music commands kicky knows")
  .addField(`${CONFIG.prefix}play <youtubelink>`,'kicky plays the song (you have to be in a voice channel)')
  .setFooter(`for support visit the discord server(${SUPPORT}).`)


var method = Informer.prototype;

function Informer(message, avatar) {
    this._guildId = message.guild.id
    this._message = message;
    this._avatar = avatar;
    this._config ={};
}

method.info = function() {
    return infoCard;
};

method.help = function() {
    return generalHelp;
};

method.respond = function() {
  msgArray = this._message.content.substring(CONFIG.prefix.length).split(' ');
  console.log(CONFIG);
  let cmd = msgArray[0].toLowerCase();
  let args;
  if(msgArray[1]) {
    args = msgArray[1].toLowerCase();
  }

  switch(cmd.toLowerCase()) {
    case 'info':
      this._message.channel.send(infoCard);
      break;
    case 'help':
      if (args == '' || args == null){
        this._message.channel.send(generalHelp);
      } else {
        switch(args) {
          case 'music':
            this._message.channel.send(musicHelp);
            break;
          case 'fun':
            this._message.channel.send(funHelp);
            break;
          default:  this._message.channel.send(`unknown args: ${args}`);
        }
      }
      break;
  }
};

module.exports = Informer;
