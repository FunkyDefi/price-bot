// https://www.coingecko.com/en/coins/{revenue-coin} <- this is the coingecko id
// or this https://api.coingecko.com/api/v3/search?query=rvc
// Strings or text with are written inside these -> `` can have
// variables put inside it. e.g.
//
// const name = 'Dodus'
// `My name is ${name}` gets converted to: My name is Dodus
//
// Imports
require('dotenv').config({ path: './.env' });
const axios = require('axios');
const { Client, Intents } = require('discord.js');

// Create the Discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Function that does the actual work. Declared but not called so not run
// when you start the file
async function updateBotActivity() {
    // See https://www.coingecko.com/en/api/documentation
    const url = `https://api.coingecko.com/api/v3/coins/${process.env.TOKEN_COINGECKO_ID}`
    // Make request to url
    const response = await axios.get(url)
    // In the response data (useful bit) save the market_data key to marketData variable
    const marketData = response.data.market_data
    // Save the bits you want to use to variables
    const usdPrice = marketData.current_price.usd
    const satsPrice = marketData.current_price.sats
    // Now create the activity text for the bot to display
    const activityText = `Your text here $${usdPrice} ${satsPrice}`
    // Update the bot with this text
    client.user.setActivity(activityText)
  }

// When the client is ready, run this code (only once)
client.once('ready', function () {
  console.log('Ready!');
  // Call this function every INTERVAL
  setInterval(updateBotActivity, process.env.INTERVAL)
})

// Bot logs in
client.login(process.env.DISCORD_TOKEN);
