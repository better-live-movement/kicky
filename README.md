# Kicky
## Usage
use [this](https://discordapp.com/api/oauth2/authorize?client_id=384572972851265538&permissions=8&scope=bot) link to
[invite Kicky](https://discordapp.com/api/oauth2/authorize?client_id=384572972851265538&permissions=8&scope=bot) to your Discord-Server.
If you want your own Kicky have a look at the [Own Kicky](#id1) section

## features
### basic commands
This is a list of basic commands Kicky already knows.

The default prefix is `k!`

| commands | action |
| --- | --- |
| `<prefix>hello` | greets you with your name |
| `<prefix>ping` | try it ;-) |
| `<prefix>8ball` | ask a question that can be answered with yes or no |
| `<prefix>help` | shows this list of commands |
| `<prefix>info` | shows general infos about Kicky |

### music
to play music you musst be in a voice channel!
type `<prefix>play <youtube-link>` to play a song.

## Own Kicky
<a id="id1"></a>If you want to rund your own copy of this bot there are some
## requirement
- nodejs 10.0.0
- ffmpeg

### Install
Clone tis repo and replace `require('./token.js')` in `index.js` with your own secret token in quotes.

to instal dependencies run
```
npm install
```

to start the bot run
```
node index.js
```
in a screen session so you can detach from the session and the bot is still running

## more
read the [CHANGELOG](https://github.com/better-live-movement/kicky/blob/master/CHANGELOG.md) for latest updates
