const discord = require("discord.js");

module.exports.run = async(bot, message, arguments) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

    if (!kickUser) return message.channel.send("User not found");

    var reason = arguments.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, You can't do this");

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorr,y You can't kick him");

    if (!reason) return message.channel.send("Give a reason.")

    var kick = new discord.RichEmbed()
        .setDescription("User kicked from server")
        .setColor("03adfc")
        .addField("Kicked user:", kickUser)
        .addField("Kicked by:", message.author)
        .addField("Reason:", reason)
        .setAuthor("TF Admin")
    
    var kickChannel = message.guild.channels.find(`name`, "tfbotcommands");
    if (!kickChannel) return message.guild.send("Code 606 @ SavageMM");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    return;

}

module.exports.help = {
    name: "kick"
}