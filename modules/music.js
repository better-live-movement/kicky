var method = Music.prototype;

function Music(foo) {
    this._foo = foo;
}

method.getAge = function() {
    return this._avatar;
};
method.info = function() {
    return infoCard;
};

method.help = function() {
    return generalHelp;
};

module.exports = Informer;


  // function play (args){
  //
  // }
  //
  // function skip (args){
  //
  // }
  //
  // function foo (stop){
  //
  // }


var servers = {};


function play(connection, message){
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
  server.queue.shift();
  server.dispatcher.on("end", () => {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}







    // case 'play':
    //   if (!args[1]) {
    //     message.channel.send('please provide a link!');
    //     return;
    //   }
    //   if (!message.member.voiceChannel) {
    //     message.channel.send('You musst be in a voice channel!');
    //     return;
    //   }
    //   if (!servers[message.guild.id]) servers[message.guild.id] = {queue: []};
    //   var server = servers[message.guild.id];
    //   server.queue.push(args[1]);
    //   if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection => {
    //     play(connection, message);
    //   });
    //   break;
    // case 'skip':
    //   var server = servers[message.guild.id];
    //   if (server.dispatcher) server.dispatcher.end();
    //   break;
    // case 'stop':
    //   if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    //   break;
