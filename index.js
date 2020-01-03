const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    // filter alleen js files
    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        HTMLFormControlsCollection.log("Can't find any file's");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} is loaded and ready!`);

        bot.commands.set(fileGet.help.name, fileGet);

    });

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("Getting Created by my dad luuk", { type: "WATCHING" });

});

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot,message, arguments);

    if (command === `${prefix}hallo`) {

        return message.channel.send("Hallo");
    }

});
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
/* =================================================     lOG VOOR DELETED MESSAGE THE FATALS BOT!    ==========================================================*/
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
bot.on("messageDelete", async (messageDelete) => {

    var userIcon = messageDelete.author.displayAvatarURL
    var userSended = messageDelete.author.tag
    var deletedIn = messageDelete.channel
    var messageDel = messageDelete.content
    var delTime = messageDelete.createdAt

    var deletedMessage = new discord.RichEmbed()
    .setTitle("Removed Message")
    .setThumbnail(userIcon)
    .setColor("03adfc")
    .setDescription(`**Message sent by __${userSended}__ deleted in "${deletedIn}" **`)
    .addField("**Message:**",` **${messageDel}** `)
    .addField("Deleted on", delTime)

    var logChannel = messageDelete.guild.channels.find(`name`, "mod-log");

    if (!logChannel) return message.guild.send("Code 606 @ SavageMM");

    logChannel.send(deletedMessage);
    console.log(`${messageDelete.author.tag} deleted message "${messageDelete.content}" `)
    return;
   });
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
/* =================================================       lOG VOOR ADDED ROLE THE FATALS BOT!       ==========================================================*/
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
bot.on("createRole", async createRole => {

    var newRole = createRol.role.name

    var roleCreated = new discord.RichEmbed()
    .setTitle("Role Created")
    .addField(createRol)

    var logChannel = messageDelete.guild.channels.find(`name`, "delete-log");

    if (!logChannel) return message.guild.send("Code 606 @ SavageMM");

    logChannel.send(roleCreated);
    return;
   });

bot.login(process.env.token);