Discord = require('discord.js');









const exampleEmbed = new Discord.RichEmbed().setTitle('Some title');

if (message.author.bot) {
    exampleEmbed.setColor('#7289da');
}





let method = Informer.prototype;

function OInformer(message, avatar, config) {
    this._guildId = message.guild.id;
    this._message = message;
    this._avatar = avatar;
    this._config = config;
}

method.info = function() {
    return infoCard;
};

method.help = function() {
    return generalHelp;
};








exports.add_foo = (guild_id) => {
    const foo = new Foo({
        _id: guild_id,
        prefix: process.env.PREFIX
    });
    foo.save()
        .then(doc =>{
            console.log('guild added to db: ', doc._id);
            const greeter = new Greeter(guild_id);
            greeter.add_greeter(guild_id);
        })
        .catch(console.error);
};










method.respond = function() {
    msgArray = this._message.content.substring(this._config.prefix.length).split(' ');
    //console.log(CONFIG);
    let cmd = msgArray[0].toLowerCase();
    let args;
    if(msgArray[1]) {
        args = msgArray[1].toLowerCase();
    }

    switch(cmd.toLowerCase()) {
        case 'info':
            this._message.channel.send(infoCard);
            break;
        case 'help':
            if (args == '' || args == null){
                this._message.channel.send(generalHelp);
            } else {
                switch(args) {
                    case 'music':
                        this._message.channel.send(musicHelp);
                        break;
                    case 'fun':
                        this._message.channel.send(funHelp);
                        break;
                    default:  this._message.channel.send(`unknown args: ${args}`);
                }
            }
            break;
    }
};

module.exports = Informer;
