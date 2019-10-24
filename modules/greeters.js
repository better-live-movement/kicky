const mongoose = require('mongoose');
const Greeter = require('../models/greeter');
const Logger = require('../tools/logger');
const Log = new Logger("Greeter");

const method = GreeterController.prototype;

function GreeterController() {
  this._config = {};
  this._help = {
    "set foo": "sets foo",
    "set": "sets bar"
  };
}

method.add_greeter = function (guild_id) {
  const greeter = new Greeter({
    _id: new mongoose.Types.ObjectId(),
    guild_id: guild_id
  });
  greeter.save()
  .then(doc => {
    Log.add(`greeter saved for guild: ${guild_id}`);
  })
  .catch(err =>{
    Log.add(err);
  });
}

method.remove_greeter = function (guild_id) {
  Greeter.deleteOne({guild_id: guild_id})
  .exec()
  .then(result => {
    console.log('removed greeter', result);
  })
  .catch(console.error);
}

method.get_config = function (guildId, cb) {
  Greeter.findOne({guild_id: guildId})
  .exec()
  .then(doc => {
    if (doc) {
      this._config = doc;
      cb();
    } else {
      Log.add(`No config found for this GuildId ${guildId}. Add greeter to db.`, 'Greeter: Load config faild');
      this.add_greeter(guildId);
    }
  })
  .catch(err => {
    Log.add(err, 'Greeter: Load config faild');
  });
}

method.welcome = function(member) {
  console.log("this._config.moduleActive", this._config.moduleActive);

  if (this._config.moduleActive === false) {
    return;
  }
  if (this._config.greetNewbies) {
    this.greet(member);
  }
  if(this._config.greetPrivate){
    //do it
  }
  if (this._config.setNewbieRole) {
    method.assignRole(member);
  }
}

method.greet = function(member) {
  console.log('this._config', this._config);
  const channel = member.guild.channels.get(this._config.greetChannel);
  if (!channel) return;

  let replacements = {"{user}":member,"{server}":member.guild};
  let greetText = this._config.greetText.replace(/{\w+}/g, function(all) {
    return replacements[all] || all;
  });

  channel.send(greetText);
}

//client.channels.get("id") or guild.channels.get("id")



//  if (member.guild.channels.find('name', 'welcome') && (greeter || member.guild.id == "403675414272147457")) {
//    try {
//      const ch = member.guild.channels.find('name', 'welcome');
//      ch.send('Hey ' + member.toString() +'! Welcome to my home! Please read the #rules before posting anything.');
//    } catch (e) {
//      console.log(e.stack);
//    }
//  } else {
//    if (member.guild.channels.find('name', 'general') && (greeter || member.guild.id == "403675414272147457")) {
//      try {
//        member.guild.channels.find('name', 'general').send('Welcome ' + member.toString());
//      } catch (e) {
//        console.log(e.stack);
//      }
//    }
//  }







method.assignRole = function(member) {
  //newbieRoles:Array
  //member.addRole(member.guild.roles.find("name", this._config.newbieRole));
}

method.goodbye = function(member) {
  if (this._config.moduleActive === false) {
    return;
  }
  if (this._config.sendLeaveMessage) {
    method.sendLeaveMessage(member);
  }
  if (this._config.setNewbieRole) {
    method.revokeRole(member);
  }
}

method.sendLeaveMessage = function (member) {
  //do it
    //leaveMessage:"**{user.idname}** just left the server 🙁"
}

method.revokeRole = function (member) {
  //do it
}

module.exports = GreeterController;
