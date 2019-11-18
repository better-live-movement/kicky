const OldInformer = require('../modules/old_Informer');
const Fun = require('../modules/Fun');
const Anno = require('../modules/anno');
const Roler = require('../modules/Roler');
const InfoController = require('../controllers/info');
const Greeter = require('../modules/greeter/greeterCommands');

const YTDL = require('ytdl-core');

function play(connection, message){
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
  server.queue.shift();
  server.dispatcher.on("end", () => {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

var servers = {};





exports.exec_comand = (msg, bot, config) => {
  //soon (tm)
  let modules = [
    'anno',
    'config',
    '8ball'
  ];

  msgArray = msg.content.substring(config.prefix.length).split(' ');

  let module = msgArray[0].toLowerCase();

  let command;
  let args;
  if(msgArray[1]) {
    command = msgArray[1].toLowerCase();
  }
  if(msgArray[2]) {
    args =msgArray.slice(2);
  }
  let oldInformer = new OldInformer(msg, bot.user.avatarURL, config);



  switch(module) {
    case 'hello':
    case 'ping':
    case '8ball':
      let funComander = new Fun(msg);
      command = msgArray[0].toLowerCase();
      args =msgArray.slice(1);
      funComander.command(command, args);
      break;
    case 'help':
    case 'info':
        oldInformer.respond();
        InfoController.respond(msg, bot, config);
      break;
    case 'greeter':
      Greeter.execCommand(msg, bot, config);
      break;
    case 'anno':
      let announcer = new Anno(msg);
      announcer.announce();
      break;
    case 'play':
      if (!msgArray[1]) {
        msg.channel.send('please provide a link!');
        return;
      }
      if (!msg.member.voiceChannel) {
        msg.channel.send('You musst be in a voice channel!');
        return;
      }
      if (!servers[msg.guild.id]) servers[msg.guild.id] = {queue: []};
      var server = servers[msg.guild.id];
      server.queue.push(msgArray[1]);
      if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(connection => {
        play(connection, msg);
      });
      break;
    case 'skip':
      var server = servers[msg.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      break;
    case 'stop':
      if (msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
      break;
    case 'add_role':
    case 'delete_role':
    case 'assign_role':
    case 'revoke_role':
      let rolingStuff = new Roler(msg);
      rolingStuff.manage(msg);
      break;
    default:
      msg.channel.send('***Invalid command!***');
      msg.channel.send(oldInformer.help());
      break;
  }

};
