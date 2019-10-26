const Discord = require('discord.js');
const mongoose = require('mongoose');
//const Guild = require('./models/guild');
const GuildController = require('./controllers/guild');
const CommandController = require('./controllers/command');
const Logger = require('./tools/logger');
const Log = new Logger('index');

//const Informer = require('./modules/Informer');
const Greeter = require('./modules/greeter/greeters');

const TOKEN = require('./token.js');
const CONFIG = require('./config.json');

const PREFIX = CONFIG.prefix;
const DEFAULT_PREFIX = process.env.PREFIX;


function generateHex(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

let bot = new Discord.Client();

bot.on('ready', async () => {
  bot.user.setPresence({
    game: {
      name: `${DEFAULT_PREFIX}info | ${DEFAULT_PREFIX}help`
    },
    status: 'dnd'})
  .then(console.log)
  .catch(console.error);
  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
});

//conect to DB
mongoose.connect(
  'mongodb://' +
  process.env.USER + ':' +
  process.env.PASSWD +
  '@kickybot-shard-00-00-sjo1k.mongodb.net:27017/' +
  process.env.DB +
  '?ssl=true&replicaSet=KickyBot-shard-0&authSource=admin',
  {
    useNewUrlParser: true,
    dbName: process.env.DB,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log('\nconnected to database ', process.env.DB, '\n')
}).catch(error => {
  console.log(error);
});
mongoose.Promise = global.Promise;

bot.on('guildCreate', (guild) => {
  console.log(bot.user.username + " was invited to and joined " + guild.name);
  GuildController.add_guild(guild.id);
});

bot.on('guildDelete', (guild) => {
  GuildController.remove_guild(guild.id);
});

let greeter = false;

bot.on('guildMemberAdd', member => {
  const greeter = new Greeter();
  greeter.get_config(member.guild.id, () => {
    greeter.welcome(member);
  });




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
  GuildController.get_config(message.channel.guild.id, (err, config) => {
    if(err){
      console.error(err);
    } else if (!config) {
      message.channel.send('No config found for this Guild. Try again.');
      GuildController.add_guild(message.channel.guild.id);
    } else {
      console.log('guild: ', message.channel.guild.id, ' config: ', config);
      if(message.content.startsWith(config.prefix)){
        Log.add(message.content, 'command', true, 'info');
        CommandController.exec_comand(message, bot, config);
      } else if (message.content.startsWith(DEFAULT_PREFIX)) {
        message.channel.send(`The prefix here is  ${config.prefix}`);
      }
    }
  });
});

bot.login(TOKEN);
