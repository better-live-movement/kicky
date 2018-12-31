var method = EightBall.prototype;
  function EightBall() {
    this._fortunes = [
      'Yes!',
      'No!',
      'Maybe!',
      'Yeah, well, whatever...',
    ];
  }

  method.ask = function(member) {
    return fortunes[Math.floor(Math.random() * fortunes.length)]
  }

module.exports = EightBall;
