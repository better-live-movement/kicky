const Authorizer = require('./Authorizer');
const pjson = require('../package.json');

var method = Anno.prototype;

  function Anno(msg) {
    this._message = msg;
    this._data = {
      "author": msg.author,
      "guild": msg.guild,
      "roles": msg.guild.roles
    };
  }

  method.version = function() {
    this._message.guild.channels.find(x => x.name === "announcements").send(`@everyone Version ${pjson.version} is alive!!!`);
    return;
  };

  //soon tm
  method.info = function() {
    //this._message.guild.channels.find('name', 'announcements').send(`@everyone ${msg}`);
    return;
  };

  method.announce = function(){
    let perms = new Authorizer(this._message.author, this._message.guild);
    if(perms && this._message.guild.channels.find(x => x.name === "bot-spam")){
      this.version();
    }
  }

module.exports = Anno;
