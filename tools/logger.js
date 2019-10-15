let method = Logger.prototype;
function Logger(name = 'kicky') {
    this._name = name;
}

method.add = function(content, name = 'log', date = false, type = 'info') {
  //Log 2 console 4 now
  if(type === 'error'){
    console.error(content);
  } else {
    console.log(name, ' :', content);
  }
}

module.exports = Logger;
