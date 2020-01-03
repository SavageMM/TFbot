const discord = require("discord.js");

module.exports.run = async (bot, message, arguments) => {
    var banUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if (!banUser) return message.channel.send("404 Can't find this username");

    var reason = arguments.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do this.");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't ban him.");
    
    if (!reason) return message.channel.send("Give a reason.")

    var ban = new discord.RichEmbed()
        .setDescription("User banned from server")
        .setColor("03adfc")
        .addField("banned user:", banUser)
        .addField("banned by:", message.author)
        .addField("Reason:", reason)
        .setAuthor("TF Admin")

    var banChannel = message.guild.channels.find(`name`, "tfbotcommands");
    if (!banChannel) return message.guild.send("Code 404 channel not found @ SavageMM");

    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);
    console.log("Banned", banUser)
    return;
    
}

module.exports.help = {
    name: "ban"
}