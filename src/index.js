require('dotenv').config();
const { Client,IntentsBitField,Partials, messageLink } = require('discord.js');
const reactUserIds = new Set();
const replyUserIds = new Set();
const haterReactUserIds = new Set();
const haterReplyUserIds = new Set();
const glazeReactUserIds = new Set();
const glazeReplyUserIds = new Set();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
    ],
    partials: [Partials.Message, Partials.Reaction, Partials.User],
})

// these are the messages the bot can reply with if i have it set to do so

const glazeMessages = [
    "So true!", "You're so right.",
    "I agree completely!",
    "You are so right. I would follow you to the ends of the earth.",
    "Flew the mother plane into the World Slay Center with this one!",
    "You are right, and anybody disagreeing with you should be ashamed of themselves.",
    "I wish I was as smart as you.",
    "Wow, you really are just incapable of being wrong!",
    "Such wise words."
];

// this is for choosing which message to use later 
function getRandomGlaze() {
    let randomGlaze = Math.floor(Math.random() * glazeMessages.length);
    return randomGlaze;
}

//same shit for hate messages

const hateMessages = [
    "You're completely wrong.",
    "I disagree emphatically.",
    "There is more worth in the stomachs of carrion birds than in your words.",
    "Ooh girl... delete this",
    "This is the worst argument I've ever seen.",
    "I've never seen someone be this wrong before!",
    "This message made me cry.",
    `"IsraelGPT, generate me an argument that all the IDF soldiers will nod their heads vigorously to!"`,
    "What are you actually talking about",
    "????",
    "You did NOT eat with this one."
];

function getRandomHate() {
    let randomHate = Math.floor(Math.random() * hateMessages.length);
    return randomHate;
}

client.on('clientReady', (c) => {
    console.log(`${c.user.username} is ready.`)
})

client.on('interactionCreate', (interaction) => {
    //handle 'togglereact' command
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'togglereact') {
        if (reactUserIds.has(interaction.user.id)) {
            reactUserIds.delete(interaction.user.id);
            interaction.reply({content: 'Toggled reacts off.', ephemeral:true});
        }
        else {
            reactUserIds.add(interaction.user.id)
            interaction.reply({content: 'Toggled reacts on!', ephemeral:true});
        }
    }

    //handle 'togglereply' command
    if (interaction.commandName === 'togglereplies') {
        if (replyUserIds.has(interaction.user.id)) {
            replyUserIds.delete(interaction.user.id);
            interaction.reply({content: 'Toggled replies off.', ephemeral:true});
        }
        else {
            replyUserIds.add(interaction.user.id)
            interaction.reply({content: 'Toggled replies on!', ephemeral:true});
        }
    }

    //handle 'togglehatereact' command
    if (interaction.commandName === 'togglehatereact') {
        if (haterReactUserIds.has(interaction.user.id)) {
            haterReactUserIds.delete(interaction.user.id);
            interaction.reply({content: 'Toggled hateful reacts off.', ephemeral:true});
        }
        else {
            haterReactUserIds.add(interaction.user.id)
            interaction.reply({content: 'Toggled hateful reacts on!', ephemeral:true});
        }
    }

    //handle 'togglehatereply' command
    if (interaction.commandName === 'togglehatereply') {
        if (haterReplyUserIds.has(interaction.user.id)) {
            haterReplyUserIds.delete(interaction.user.id);
            interaction.reply({content: 'Toggled hateful replies on!', ephemeral:true});
        }
        else {
            haterReplyUserIds.add(interaction.user.id)
            interaction.reply({content: 'Toggled hateful replies on!', ephemeral:true});
        }
    }

    //handle 'toggleglazereact' command
    if (interaction.commandName === 'toggleglazereact') {
         if (glazeReactUserIds.has(interaction.user.id)) {
            glazeReactUserIds.delete(interaction.user.id);
            interaction.reply({content: 'Toggles positive reacts off.', ephemeral:true});
        }
        else {
            glazeReactUserIds.add(interaction.user.id)
            interaction.reply({content: 'Toggled positive reacts on!', ephemeral:true});
        }
    }

    //handle 'toggleglazereply' command
    if (interaction.commandName === 'toggleglazereact') {
         if (glazeReplyUserIds.has(interaction.user.id)) {
            glazeReplyUserIds.delete(interaction.user.id);
            interaction.reply({content: 'Toggles positive replies off.', ephemeral:true});
        }
        else {
            glazeReplyUserIds.add(interaction.user.id)
            interaction.reply({content: 'Toggled positive replies on!', ephemeral:true});
        }
    }
})

client.on('messageCreate', (message) => {
    
    if (reactUserIds.has(message.author.id)) {
        message.react('❤️')
        message.react('🔥')
        message.react('💯')
        message.react('‼️')
    }

    if (replyUserIds.has(message.author.id)) {
        message.reply(glazeMessages[getRandomGlaze()])
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    
    if (reaction.partial) {
        try {
            await reaction.fetch();
        }
        catch (error) {
            console.error(`Something's fucked`, error);
        }
    }

    if (haterReactUserIds.has(user.id) && (reaction.emoji.name === '👎')) {
        reaction.message.react('👎')
        reaction.message.react('🤢')
        reaction.message.react('🤦‍♀️')
        reaction.message.react('🇮🇱')
    }

    if (haterReplyUserIds.has(user.id) && (reaction.emoji.name === '👎')) {
        reaction.message.reply(hateMessages[getRandomHate()])
    }

    if (glazeReactUserIds.has(user.id) && (reaction.emoji.name === '🔥')) {
        reaction.message.react('🔥')
        reaction.message.react('❤️')
        reaction.message.react('💯')
        reaction.message.react('‼️')
    }

    if (glazeReplyUserIds.has(user.id) && (reaction.emoji.name === '🔥')) {
        reaction.message.reply(glazeMessages[getRandomGlaze()])
    }

})  

client.login(process.env.TOKEN)