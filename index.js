const { LIVE } = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');

client.on('ready', async () => {
  let channel = client.channels.cache.get(process.env.CHANNEL) || await client.channels.fetch(process.env.CHANNEL)

  if(!channel) return;
  const connection = await channel.join();
  connection.play(ytdl(LIVE))
})

setInterval(async function() {
  if(!client.voice.connections.get(process.env.SERVER)) {
    let channel = client.channels.cache.get(process.env.CHANNEL) || await client.channels.fetch(process.env.CHANNEL);
    if(!channel) return;

    const connection = await channel.join()
    connection.play(ytdl(LIVE))
  }
}, 20000)

client.login(process.env.TOKEN)
