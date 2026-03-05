require('dotenv').config();
const { Client,IntentsBitField } = require('discord.js');
let reactEnabled = false;
const reactUserIds = new Set();
let replyEnabled = false;
const replyUserIds = new Set();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
    ]
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
];
// this is for choosing which message to use later 
function getRandomGlaze() {
    let randomGlaze = Math.floor(Math.random() * glazeMessages.length);
    return randomGlaze;
}

client.on('clientReady', (c) => {
    console.log(`${c.user.username} is ready.`)
})

client.on('interactionCreate', (interaction) => {
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
})

client.on('messageCreate', (message) => {
    if (reactUserIds.has(message.author.id)) {
        message.react('❤️')
        message.react('🔥')
        message.react('💯')
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'toggleglaze') {
        if (replyUserIds.has(interaction.user.id)) {
            replyUserIds.delete(interaction.user.id);
            interaction.reply({content: 'Toggled reacts off.', ephemeral:true});
        }
        else {
            replyUserIds.add(interaction.user.id)
            interaction.reply({content: 'Toggled reacts on!', ephemeral:true});
        }
    }
})

client.on('messageCreate', (message) => {
    if (replyUserIds.has(message.author.id)) {
        message.reply(glazeMessages[getRandomGlaze()])
    }
})

client.login(process.env.TOKEN);