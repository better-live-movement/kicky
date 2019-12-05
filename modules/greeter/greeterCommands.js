const Discord = require('discord.js');
const Greeter = require('./greeterController');
const greeterController = new Greeter();

function setConfigProperty(propName, args, guildId, msg) {
  let value = args.join(' ');
  switch (propName) {
    case 'greetChannel':
      setGreetChannel(value, guildId, msg);
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

function setGreetChannel(channelName, guildId, msg) {
  let GreetChannel = msg.guild.channels.find("name",channelName);
  let data = [
    {"propName": 'greetChannel', "value": GreetChannel.id}
  ];
  greeterController.patchConfig(guildId, data);
}

function setNewbieRoles(roleNames) {
  //TODO: add or remove
}

function removeNewbieRole(roleToRemove, newbieRolesInConfig, msg, guildId){
  msg.channel.send('removing role...');
  if(newbieRolesInConfig.indexOf(roleToRemove) === -1){
    console.log('this role is not in greeter-config');
  } else {
    newbieRolesInConfig.splice(newbieRolesInConfig.indexOf(roleToRemove), 1);
    let data = [
      {"propName": 'newbieRoles', "value": newbieRolesInConfig}
    ];
    greeterController.patchConfig(guildId, data);
    msg.channel.send('done');
  }
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
      setConfigProperty(msgArray[2], args, msg.guild.id, msg);
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
