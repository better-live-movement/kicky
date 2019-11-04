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
  //soon tm
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
  } else {
    //soon tm
    args = msgArray.slice(2);
  }
};
