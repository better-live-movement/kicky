let method = Logger.prototype;
function Logger(name = 'kicky') {
    this._name = name;
}

method.add = function(content, name = 'log', date = false) {
  //Log 2 console 4 now
  console.log(name, ' :', content);
}

module.exports = Logger;
