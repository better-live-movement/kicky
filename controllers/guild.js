const mongoose = require('mongoose');
const Guild = require('../models/guild');
const Discord = require('discord.js');


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
}

exports.add_guild = (id) => {
  const guild = new Guild({
    _id: id,
    prefix: process.env.PREFIX
  });
  guild.save()
  .then(doc =>{
    console.log('guild added to db: ', doc._id);
  })
  .catch(console.error);
}


exports.remove_guild = (id) => {
  Guild.deleteOne({_id: id})
  .exec()
  .then(result => {
    console.log('removed Guild: ', result);
  })
  .catch(console.error);
}

exports.list_guilds = (message) => {
  this.message = message;
  Guild.find()
  .exec()
  .then(docs => {
    docs.forEach((doc, idx, message) => {
      let Guildembed = new Discord.RichEmbed()
        .setTitle("config for joined guild")
        .addField("id",doc._id)
        .addField("prefix",doc.prefix)
      this.message.channel.send(Guildembed);
    });
  })
  .catch(console.error);
}
