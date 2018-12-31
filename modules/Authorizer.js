let method = Authorizer.prototype;

function Authorizer(author, guild) {
  this._vars = {
    author: author,
    guild: guild
  };
}

method.hasPermissionTo = function(action, args = null){
  switch (action) {
    case 'init-config':
      userId = this._vars.author.id;
      guildOwnerId = this._vars.guild.ownerID;
      if (userId == guildOwnerId || userId == '231143719850475520') {
        return true;
      } else {
        return false;
      }
      break;
    case 'change-roles':
      userId = this._vars.author.id;
      guildOwnerId = this._vars.guild.ownerID;
      if (userId == guildOwnerId || userId == '231143719850475520') {
        return true;
      } else {
        return false;
      }
      break;
    default:
      return false;
  }
}

module.exports = Authorizer;
