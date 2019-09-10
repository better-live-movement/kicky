const model = require('../models/greeter');
const Logger = require('../tools/logger');

var method = Greeter.prototype;
  function Greeter(guildId) {
    model.findById(guildId)
    .exec()
    .then(doc => {
      if (doc) {
        this._config = doc;
      } else {
        Log.add(`No config found for this GuildId ${guildId}`, 'Greeter: Load config faild');
      }
    })
    .catch(err => {
      Log.add(err, 'Greeter: Load config faild');
    });
  }

  method.welcome = function(member) {
    console.log("wellcome noob");

    // if (this._config.moduleActive === false) {
    //   return;
    // }
    // if (this._config.greetNewbies) {
    //   method.greet(member);
    //   console.log("greet newbies");
    // }
    // if (this._config.setNewbieRole) {
    //   method.greet(member);
    // }

  }

  method.greet = function(member) {
    // var find = 'abc';
    // var re = new RegExp(find, 'g');
    // str = str.replace(re, '');
    try {
      member.guild.channels.find('name', this._config.greetChannel)
      .send(this._config.greetText);
      //.send('Welcome ' + member.toString());
    } catch (e) {
      console.log(e.stack);
    }
  }

  method.setRole = function(member) {
    member.addRole(member.guild.roles.find("name", this._config.newbieRole));
  }








module.exports = Greeter;
