var method = EightBall.prototype;
  function EightBall() {
    this._fortunes = [
      'Yes!',
      'No!',
      'Maybe!',
      'Yeah, well, whatever...',
    ];
  }

  method.ask = function(question) {
    return this._fortunes[Math.floor(Math.random() * this._fortunes.length)]
  }

module.exports = EightBall;
