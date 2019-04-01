const EightBall = require('./EightBall');
const Logger = require('../tools/logger');

var method = Fun.prototype;

function Fun(message) {
    this._message = message;
}

method.command = function(cmd, args=[]) {
  switch(cmd) {
    case 'hello':
      this._message.channel.send('Hello '
        + this._message.author.toString() + '!');
      break;
    case 'ping':
      this._message.channel.send('pong!');
      break;
    case '8ball':
      if (args) {
        let magicEightBall = new EightBall();
        let answer = magicEightBall.ask(args);
        this._message.channel.send(answer);
      } else {
        this._message.channel.send('what?!');
      }
      break;
    default:
      let Log = new Logger("FunModule");
      Log.add('unknown command', 'error');
      break;
  }
};

module.exports = Fun;
