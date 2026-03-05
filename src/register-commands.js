require('dotenv').config();
const {REST,Routes} = require('discord.js')

const commands = [
    {
        name: 'togglereact',
        description: 'Toggles positive bot reactions',
    },
    {
        name: 'togglereply',
        description: 'Toggles positive bot replies',
    },

    {
        name: 'togglehatereact',
        description: 'Toggles negative bot reactions on messages you react "👎" to',
    },
    {
        name: 'togglehatereply',
        description: 'Toggles negative bot replies on messages you react "👎" to',
    }, 
    {
        name: 'toggleglazereact',
        description: 'Toggles positive bot reactions on messages you react "🔥" to'
    },
    {
        name: 'toggleglazereply',
        description: 'Toggles positive bot replies on messages you react "🔥" to'
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...')

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands}
        )

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();

