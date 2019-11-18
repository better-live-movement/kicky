Discord = require('discord.js');
const VERSION = '3.0.2';
const INVITE = 'https://discordapp.com/api/oauth2/authorize?client_id=384572972851265538&permissions=8&scope=bot';
const SUPPORT = 'https://discord.gg/6VpxTbY';
const DONATE ='https://brave.com/bet307';
const DASHBOARD = 'https://better-live-movement.github.io/kicky/';
const AVATAR = 'https://cdn.discordapp.com/avatars/405516819672203274/57c31366b8622443bc0b776ffdaf779c.png?size=2048';
const BACKTICK ='`';

//TODO: create global dynamical
const modules = ['greeter', 'music'];

function getModuleHelpJason (ModuleName){
    let jason;
    if(modules.indexOf(ModuleName) !== -1){
        let path = `../modules/${ModuleName}/help`;
        jason = require(path);
    }
    return jason;
}

function sendInfoCard(msg, bot, config) {
    const infoCard = new Discord.RichEmbed();
    infoCard.setTitle('Kicky')
      .setURL(SUPPORT)
      .setColor(0x1a81cd)
      .setThumbnail(AVATAR)
      .setDescription('kicky is a multipurpose discord bot.')
      .addField('Version', VERSION)
      .addField('Help', `Use ${BACKTICK}${config.prefix}help${BACKTICK} for a list of commands`)
      .addField('Invite', `[Invite](${INVITE}) the bot to your server.`)
      .addField('Server', `Click [here](${SUPPORT}) to visit the discord server.`)
      .addField('Website', `Click [here](${DASHBOARD}) to visit the Website.`)
      .addField('donate', `To support us give the new Brave Browser a try using [this](${DONATE}) link.`)
      .setFooter(`I had / have fun writing this bot. I hope you enjoy using it.`);
    msg.channel.send(infoCard);
}

function sendGeneralHelp(msg, bot, config) {
    const generalHelp = new Discord.RichEmbed();
    generalHelp.setTitle('Help')
      .setColor(0x1a81cd)
      .setThumbnail(AVATAR)
      .setDescription('This is the general help. Kicky is organised in modules and every module have its own help.')
      .addField(`${config.prefix}help`, 'shows this help')
      .addField(`${config.prefix}info`, 'shows general infos about Kicky');
    
      modules.forEach(module => {
          generalHelp.addField(`${config.prefix}help ${module}`, `shows help about ${module} commands`);
      });
    generalHelp.setFooter(`for support visit the discord server(${SUPPORT}).`);
    msg.channel.send(generalHelp);
}

function sendModuleHelp(msg, bot, config, ModuleName) {
    let jason = getModuleHelpJason(ModuleName);
    if(!jason){
        msg.channel.send(`module not found. try ${config.prefix}help.`);
    } else {
        const moduleHelpEmbed = new Discord.RichEmbed();
        moduleHelpEmbed.setTitle(`${jason.module} Help`)
          .setColor(0x1a81cd)
          .setThumbnail(AVATAR)
          .setDescription(jason.description);
        
        for (let command of jason.commands) {
            for(let key in command){
                moduleHelpEmbed.addField(`${config.prefix}${ModuleName} ${key}`, `${command[key]}`);
            }
        }
        moduleHelpEmbed.setFooter(`for support visit the discord server(${SUPPORT}).`);
        msg.channel.send(moduleHelpEmbed);
    }
}

exports.respond = function(msg, bot, config) {
    let msgArray = msg.content.substring(config.prefix.length).split(' ');
    let cmd = msgArray[0].toLowerCase();
    let moduleName;
    if(msgArray[1]) {
        moduleName = msgArray[1].toLowerCase();
    }

    switch(cmd.toLowerCase()) {
        case 'info':
            sendInfoCard(msg, bot, config);
            break;
        case 'help':
            if (moduleName === '' || moduleName == null){
                sendGeneralHelp(msg, bot, config);
            } else {
                sendModuleHelp(msg, bot, config, moduleName);
            }
            break;
    }
};
