const Guild = require('../models/guild');
const Discord = require('discord.js');
const Greeter = require('../modules/greeter/greeters');

exports.get_config = (id, callback) => {
  Guild.findById(id)
  .exec()
  .then(doc => {
    if(doc != null){
      let config = {
      prefix: doc.prefix
      };
      callback(null, config);
    } else {
      callback(null, null);
    }
  })
  .catch(err => {
    callback(err);
  });
};

exports.add_guild = (guild_id) => {
  const guild = new Guild({
    _id: guild_id,
    prefix: process.env.PREFIX
  });
  guild.save()
  .then(doc =>{
    console.log('guild added to db: ', doc._id);
    const greeter = new Greeter(guild_id);
    greeter.add_greeter(guild_id);
    //init level
    //init mod
    //init music
    //init sales
  })
  .catch(console.error);
};


exports.remove_guild = (guild_id) => {
  const greeter = new Greeter(guild_id);
  greeter.remove_greeter(guild_id);
  Guild.deleteOne({_id: guild_id})
  .exec()
  .then(result => {
    console.log('removed Guild: ', result);
  })
  .catch(console.error);
};

exports.list_guilds = (message) => {
  this.message = message;
  Guild.find()
  .exec()
  .then(docs => {
    docs.forEach((doc) => {
      let GuildEmbed = new Discord.RichEmbed()
        .setTitle("config for joined guild")
        .addField("id",doc._id)
        .addField("prefix",doc.prefix);
      this.message.channel.send(GuildEmbed);
    });
  })
  .catch(console.error);
};
