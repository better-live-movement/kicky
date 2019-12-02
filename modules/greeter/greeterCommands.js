const Discord = require('discord.js');
const Greeter = require('./greeterController');
const greeterController = new Greeter();

function setConfigProperty(propName, args, guildId) {
  let value = args.join(' ');
  switch (propName) {
    case 'greetChannel':
      setGreetChannel();
      break;
    case 'newbieRoles':
      setNewbieRoles();
      break;
    default:
      let data = [
        {"propName": propName, "value": value}
      ];
      greeterController.patchConfig(guildId, data);
      break;
  }
}

function setGreetChannel(channelName) {
  //soon tm
}

function setNewbieRoles(roleNames) {
  //TODO: add or remove
}

exports.execCommand = (msg, bot, config) => {
  let msgArray = msg.content.substring(config.prefix.length).split(' ');
  let command, args;
  if(msgArray[1]) {
    command = msgArray[1].toLowerCase();
  }
  if(command === 'set'){
    args = msgArray.slice(3);
    let propNames = greeterController.getPropNames();
    if (propNames.indexOf(msgArray[2]) !== -1){
      setConfigProperty(msgArray[2], args, msg.guild.id);
    }
  } else if(command === 'get' || command === getconfig) {
    greeterController.get_config(msg.guild.id, (resp) => {
      console.log(resp);
      const greeterConfigEmbed = new Discord.RichEmbed()
        .setTitle('greeter-config')
        .setColor(0x1a81cd)
        .addField('moduleActive', resp.moduleActive ? '✓' : 'x')
        .addField('greetNewbies', resp.greetNewbies ? '✓' : 'x');
      let greetChannel = resp.greetChannel ? msg.guild.channels.get(resp.greetChannel) : 'x';
      greeterConfigEmbed.addField('greetChannel', greetChannel)
        .addField('greetText', resp.greetText ? resp.greetText : 'x')
        //.addField('greetPrivate', resp.greetPrivate ? '✓' : 'x')
        //.addField('privateMessage', resp.privateMessage ? resp.privateMessage : 'x')
        .addField('assignNewbieRole', resp.assignNewbieRole ? '✓' : 'x');
      let newbieRoles = '';
      if(resp.newbieRoles.length > 0){
        resp.newbieRoles.forEach( newbieRole => {
          let foundRole = msg.guild.roles.get(newbieRole);
          newbieRoles += foundRole.name + ' ';
        });
      } else {
        newbieRoles = '-';
      }
      greeterConfigEmbed.addField('newbieRoles', resp.newbieRoles ? newbieRoles : 'x')
        .addField('sendLeaveMessage', resp.sendLeaveMessage ? '✓' : 'x')
        .addField('leaveMessage', resp.leaveMessage ? resp.leaveMessage : 'x');
      msg.channel.send(greeterConfigEmbed);
    });
  } else {
    return false;
  }
};
