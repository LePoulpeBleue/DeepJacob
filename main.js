const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const ytdl = require('ytdl-core');
 
const adapter = new FileSync('Database.json')
const db = low(adapter)

db.defaults({
    userStats : [], messages : []
})
.write()

bot.on('ready', () => {
    bot.user.setPresence({game: {name: 'dabbé'}})
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {

  var strmessage = message.content.toLowerCase();
  const basicLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Basic");
  const blueLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Blue");
  const prisonnierLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Prisonnier");
  const fortniteLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Fortnite");
  const rainbowLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Rainbow");
  const supremeLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Supreme");

    db.get("messages").push({Autheur: message.author.username, AutheurID: message.author.id, Message: message.content, Date: new Date()}).write();

    if(!db.get('userStats').find({user: message.author.username}).value()){
        db.get('userStats').push({user: message.author.username, coin: 10, basicLama: 1, blueLama: 0, prisLama: 0, fortniteLama: 0, rainbowLama: 0, supremeLama: 0}).write();
    }else{
        var userlamadb = db.get("userStats").filter({user: message.author.username}).find('basicLama').value();
        console.log('\x1b[32m%s\x1b[0m',userlamadb);
        var userlama = Object.values(userlamadb)
        console.log(userlama);
        db.get("userStats").find({user: message.author.username}).assign({user: message.author.username, basicLama: userlama[2] += 1}).write();
    }
    if(strmessage.startsWith(".ping")){
      message.channel.send(({embed: {
        color: 0x2ed32e,
        fields: [{
            name: "PING :",
            value: "Le ping est de : " + Math.round(bot.ping) + ' ms.'
      }
     ],
     }
    }));
    }
     if(strmessage.startsWith("pierre")){
      var luck = Math.random(3);
      if(luck === 0){
        message.channel.send("Ciseau!");
        message.channel.send("J'ai perdu ;-;");
      }
      if(luck === 1){
        message.channel.send("Pierre!");
        message.channel.send("Égalité.");
      }
      if(luck === 2){
        message.channel.send("Feuille!");
        message.channel.send("J'ai Gagné :D");
      }
    }
    if(strmessage.startsWith("feuille")){
      var luck = Math.random(3);
      if(luck === 0){
        message.channel.send("Ciseau!");
        message.channel.send("J'ai Gagné :D");
      }
      if(luck === 1){
        message.channel.send("Pierre!");
        message.channel.send("J'ai perdu ;-;");
      }
      if(luck === 2){
        message.channel.send("Feuille!");
        message.channel.send("Égalité.");
      }
    }
    if(strmessage.startsWith("ciseau")){
      var luck = Math.random(3);
      if(luck === 0){
        message.channel.send("Ciseau!");
        message.channel.send("Égalité.");
      }
      if(luck === 1){
        message.channel.send("Pierre!");
        message.channel.send("J'ai Gagné :D");
      }
      if(luck === 2){
        message.channel.send("Feuille!");
        message.channel.send("J'ai perdu ;-;");
      }
    }
    if(strmessage.startsWith("bonjour" || "coucou" || "cc" || "slt" || "bjr" || "hello")){
      message.reply("Bonjour.");
    }
    if (message.isMentioned(bot.user)) {
      message.channel.send('⣿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠄⠄⠄⠄⠄⠉⠙⢻⣿\n⣿⣿⣿⣿⣿⣿⢋⠄⠐⠄⠐⠄⠠⠈⠄⠂⠠⠄⠈⣿\n⣿⣿⣿⣿⣿⡟⠄⠄⠄⠁⢀⠈⠄⠐⠈⠄⠠⠄⠁⠈⠹\n⣿⣿⣿⣿⣿⣀⡀⡖⣖⢯⢮⢯⡫⡯⢯⡫⡧⣳⡣⣗⣼\n⣿⣿⣿⣿⣷⣕⢱⢻⢮⢯⢯⡣⣃⣉⢪⡪⣊⣀⢯⣺⣺\n⣿⣿⣿⣿⣿⣷⡝⣜⣗⢽⢜⢎⢧⡳⡕⡵⡱⣕⡕⡮⣾\n⣿⣿⣿⣿⣿⡿⠓⣕⢯⢮⡳⣝⣕⢗⡭⣎⢭⠮⣞⣽⡺\n⣿⣿⣿⡿⠋⠄⠄⠸⣝⣗⢯⣳⢕⣗⡲⣰⡢⡯⣳⣳⣫\n⣿⣿⠋⠄⠄⠄⠄⠄⠘⢮⣻⣺⢽⣺⣺⣳⡽⣽⣳⣳⠏⠛⠛⠛⢿\n⣿⠇⠄⢁⠄⠄⠄⠁⠄⠈⠳⢽⢽⣺⢞⡾⣽⣺⣞⠞⠄⠄⠈⢄⢎⡟⣏⢯⢝⢛⠿\n⡇⠄⡧⣣⢢⢔⢤⢢⢄⠂⠄⠄⠁⠉⠙⠙⠓⠉⠈⢀⠄⠄⠄⠑⢃⣗⢕⣕⢥⡣⣫⢽\n⣯⠄⢽⢸⡪⡪⡣⠲⢤⠄⠄⠂⠄⠄⠄⡀⠄⠠⠐⠄⣶⣤⣬⣴⣿⣿⣷⡹⣿⣿⣾⣿\n⣿⣶⣾⣵⢱⠕⡕⡱⠔⠄⠁⢀⠠⠄⠄⢀⠄⠄⢀⣾\n⣿⣿⣿⣿⡷⡗⠬⡘⠂⠄⠈⠄⠄⠄⠈⠄⠄⠄⢸\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣧⢁⠂⠔⠠⠈⣾⠄⠂⠄⡁⢲\n⣿⣿⣿⣿⣿⣿⠿⠠⠈⠌⠨⢐⡉⠄⠁⡂⠔⠼\n⣿⣿⣿⣿⣿⣿⡆⠈⠈⠈⠄⠂⣆⠄⠄⠄⠄⣼\n⣿⣿⣿⣿⣿⣿⣿⠄⠁⠈⠄⣾⡿⠄⠄⠂⢸\n⣿⣿⣿⣿⣿⣿⡟⠄⠄⠁⠄⠻⠇⠄⠐⠄⠄⠈⠙⢻\n⣿⣿⣿⣿⣿⣿⡇⡀⠄⠂⠁⢀⠐⠄⣥⡀⠁⢀⠄⣿')
    }
    if(strmessage.startsWith(".google")){
        const args = message.content.slice(8).trim().split();
        message.channel.send("http://www.google.com/search?q=" + args + "&btnI");
    }
    if(strmessage.startsWith(".ytb")){
        const args = message.content.slice(5).trim().split();
        message.channel.send("http://www.google.com/search?q=Youtube+" + args + "&btnI");
    }
    if(strmessage.startsWith(".pp")){
        const args = message.content.slice(4).trim().split();
        bot.user.setAvatar(args.toString());
        message.channel.send("C'est fait! :D")
    }
    if(strmessage.startsWith(".pseudo")){
        const args = message.content.slice(8).trim().split();
        message.guild.members.get(bot.user.id).setNickname(args.toString());
        message.channel.send("C'est fait! :D");
        message.channel.send("Mon nouveau pseudo est : " + args);
    }
    if(strmessage.startsWith(".activité")){
        const args = message.content.slice(10).trim().split();
        bot.user.setActivity(args.toString());
        message.channel.send("C'est fait! :D");
        message.channel.send("Ma nouvelle activiter est : " + args);
    }
    if(strmessage === ".jacob"){
        bot.user.setAvatar("https://image.noelshack.com/fichiers/2019/06/6/1549718750-deepjacobicon.png");
        message.guild.members.get(bot.user.id).setNickname("Jacob");
        bot.user.setActivity("dabbé");
    }
    if(strmessage === ".clean"){
        message.channel.fetchMessages().then(function(list){
            message.channel.bulkDelete(list);
            message.channel.send("Channel nettoyer :D");
        })
    }
    if(strmessage.startsWith(".sell lama basique")){
      const args = message.content.slice(19).trim().split();
      var lamadb = db.get('userStats').filter({user: message.author.username}).find('basicLama').value();
      var lama = Object.values(lamadb);
      console.log(lama[1] + lama[2]);
      if(lama[2] >= args){
        db.get("userStats").find({user: message.author.username}).assign({user: message.author.username, basicLama: lama[2] -= parseInt(args)}).write();
        db.get("userStats").find({user: message.author.username}).assign({user: message.author.username, coin: lama[1] += parseInt(args)}).write();
      }
    }
    if(strmessage === ".banque"){
        var coindb = db.get('userStats').filter({user: message.author.username}).find('coin').value();
        var coin = Object.values(coindb);
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: message.author.username,
              icon_url: message.author.avatarURL
            },
            title: "BANQUE",
            description: " ",
            fields: [{
                name: "Vous avez : ",
                value: coin[1] + " coins"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Jacob"
            }
          }
        });
    }
    if(strmessage === ".collection"){
        var lamadb = db.get('userStats').filter({user: message.author.username}).find('basicLama').value();
        var lamas = Object.values(lamadb);
        message.channel.send({embed: {
          color: 3447003,
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
          title: "COLLECTION :",
          description: "Votre collection de lama ainsi que leurs effet.",
          fields: [{
              name: "Lama Basique : " + lamas[2] + " " + basicLama,
              value: "Effet : Aucun"
            },
            {
              name: "Lama Bleu : " + lamas[3] + " " + blueLama,
              value: "Effet : Comming soon"
            },
            {
              name: "Lama Prisonnier : " + lamas[4] + " " + prisonnierLama,
              value: "Effet : Comming soon"
            },
            {
              name: "Lama Fortnite : " + lamas[5] + " " + fortniteLama,
              value: "Effet : Comming soon"
            },
            {
              name: "Lama Rainbow : " + lamas[6] + " " + rainbowLama,
              value: "Effet : Comming soon"
            },
            {
              name: "Lama Supreme : " + lamas[7] + " " + supremeLama,
              value: "Effet : Comming soon"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: bot.user.avatarURL,
            text: "© Jacob"
          }
        }
      });
    }
    if(strmessage === ".help"){
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            title: "HELP :",
            description: "Les commande disponnible son ecrite ici.",
            fields: [{
                name: ".help",
                value: "Pour afficher toute les commandes disponible."
              },
              {
                name: ".google",
                value: "Pour une recherche google du pauvre."
              },
              {
                name: ".ytb",
                value: "Pour une recherche youtube du pauvre."
              },
              {
                name: ".pp",
                value: "Pour changer ma photo de profile c: ."
              },
              {
                name: ".pseudo",
                value: "Pour changer mon pseudo c: ."
              },
              {
                name: ".activité",
                value: "Pour changer mon activité c: ."
              },
              {
                name: ".jacob",
                value: "Pour me remettre a zero."
              },
              {
                name: ".clean",
                value: "Pour clean le chat et tout les truc douteux."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Jacob"
            }
          }
        });
    }

});

bot.login(process.env.BOT_TOKEN);
