const Logger = require('../tools/logger');
const Authorizer = require('./Authorizer');

let Log = new Logger("Roler");


var method =  Roler.prototype;

  function Roler(msg) {
    console.log(param);
    this._roling = {
      // author: msg.author,
      // guild: msg.guild,
      // roles: msg.guild.roles
    }
  }

  //let perms = new Authorizer(this._roling.author, this._roling.guild);

  method.add = function(role) {
    if (perms.hasPermissionTo('change-roles', 'add')) {
      console.log("foo");
    }
  }

  method.delete = function(role) {
    if (perms.hasPermissionTo('change-roles', 'delete')) {
      msg.guild.roles.find("name", role).delete();
    }
  }

  method.assign = function(member, role) {
    if (perms.hasPermissionTo('change-roles', 'assign')) {
      console.log("foo");
    }
  }

  method.revoke = function(member, role) {
    if (this._config.key) {
      console.log("foo");
    }
  }

  method.manage = function(msg){
      msg.channel.send('role ' + role + ' removed from member ' + member.displayName);
      switch(foo) {
      case 'add_role':
        //asdf
        break;
      case 'delete_role':
        //asdf
        break;
      case 'assign_role':
        //asdf
        break;
      case 'revoke_role':
      msg.channel.send('role ' + role + ' removed from member ' + member.displayName);
    // case 'removerole':
    //   if(messageArray[1] && messageArray[2]){
    //     let member = message.guild.members.find("displayName", messageArray[1])
    //     if(member){
    //       let role = message.guild.roles.find("name", messageArray[2])
    //       if(role){
    //         member.removeRole(role);
    //         message.channel.send('role ' + role + ' removed from member ' + member.displayName);
    //       }
    //       else{
    //         message.channel.send('member not found');
    //         console.log('member ', messageArray[1], ' not found');
    //       }
    //     }
    //     else{
    //       message.channel.send('member not found');
    //       console.log('member ', messageArray[1], ' not found');
    //     }
    //   }
    //   else{
    //     message.channel.send('member or role is missing');
    //   }
    //   break;

        break;
      default:
        //nope
        break;
    }
  }

module.exports = Roler;




    // case 'setrole':
    //   if(messageArray[1]){
    //     console.log('setrole has arguments');
    //   }
    //   break;

    // case 'deleterole':
    //   message.guild.roles.find("name", "noob").delete();
    //   break;
