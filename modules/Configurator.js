const mongoose = require('mongoose');
const Guild = require('../models/guild');
const Logger = require('../tools/logger');
const Authorizer = require('./Authorizer');

let Log = new Logger("Configurator");

let method = Configurator.prototype;
function Configurator(bot) {
  this._bot = bot;
  Guild.find()
  .exec()
  .then(docs => {
    if(docs.length >= 0){
      this._guilds = docs;
      Log.add('loaded for all guilds on database', 'configs');
    } else {
      this._guilds = [];
      Log.add('no entries found!', 'Configurator-Init_faild');
    }
  })
  .catch(err => {
    Log.add(err, 'Configurator-Init_faild');
  })
}

method.addGuild = function(guildId){
  const guild = new Guild({
    _id: guildId
  });
  guild
  .save()
  .then(result => {
    Log.add(result._id, "guild added");
    return result;
  })
  .catch(err => {
    Log.add(err, "guild NOT added");
    return err;
  })
}

method.init = function(msg, force = false){
  let guild = this._guilds.find(guild => {
    return guild._id === msg.guild.id
  });
  if (guild != null && guild.id == msg.guild.id) {
    msg.channel.send('guild is already initialized!');
  } else {
    console.log(method.guild);
    let perms = new Authorizer(msg.author, msg.guild);
    if (perms.hasPermissionTo('init-config')) {
      this.addGuild(msg.guild.id);
      msg.channel.send('guild initialized!');
    } else {
      msg.channel.send('You have not the permissions.');
    }
  }
}

method.loadConfig = function(guildId) {
  Guild.findById(guildId)
  .exec()
  .then(doc => {
    if (doc) {
      let config = this._guilds.find(guild => {
        return guild._id === guildId
      });
      if (config == undefined) {
        this._guilds.push(doc);
        console.log(`added guild ${guildId} to config array!`);
      } else {
        console.log(`Guild ${guildId} already loaded!`);
      }
    } else {
      Log.add(`guild ${guildId} not foud.`, 'loadConfig faild');
      let newGuild = this.addGuild(guildId);
      this._guilds.push(newGuild);
      Log.add(`Addet guild ${guildId} to database.`, 'loadConfig faild');
      this.loadConfig(guildId);
    }
  })
  .catch(err => {
    Log.add(err, 'loadConfig faild');
    let config;
    try {
      config = this._guilds.find(guild => {
        return guild._id === guildId
      });
    } catch (e) {
      config = this.addGuild(guildId);
      this._guilds.push(config);
    } finally {
      return;
    }
  });
}
//this way
method.getConfig = function(guildId) {
  let config;
  try {
    config = this._guilds.find(guild => {
      return guild._id === guildId
    });
  } catch (e) {
    Log.add(e,'getConfig_faild');
    config = undefined;
  } finally {
    return config;
  }
}

method.get = function(args, msg, cb){
  cb = `I don't get it!`;
  switch(args.toLowerCase()) {
    case 'prefix':
      msg.channel.send('b!');
      break;
    case 'guild-id':
      msg.channel.send(msg.guild.id);
      break;
  }
}

method.set = function(key, value, msg, cb){
  cb = `I don't get it!`;
  //msg.channel.send(`args: ${args}`);
  //role-assign
  switch(key.toLowerCase()) {
    case 'prefix':
      //setPrefix
      msg.channel.send(`I'll set the prefix soon (tm) to ${value}`);
      break;
    case 'role-assign':
      //set assignNewbieRole
      msg.channel.send(`I'll set role-assign soon (tm) to ${value}`);
    default:
      msg.channel.send('Set what?!?');
      break;
  }
}

method.reset = function(args, msg, cb){
  cb = `I don't get it!`;
}

method.configger = function(cmd, args, msg, callback){
  switch(cmd.toLowerCase()) {
    case 'get':
      this.get(args, msg, (cb) => {
        callback = cb;
      });
    case 'set':
      this.set(args[0], args[1], msg, (cb) => {
        callback = cb;
        // myArray.findIndex(x => x.id === '45');
      });
      break;
    case 'reset':
      this.reset(args, msg, (cb) => {
        callback = cb;
      });
      break;
    default:
      cb = 'go fuck your self';
      break;
  }
}

module.exports = Configurator;
