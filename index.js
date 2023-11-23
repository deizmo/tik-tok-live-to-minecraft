const mineflayer = require('mineflayer')
const prompt = require("prompt-sync")({ sigint: true })
const port = prompt('your minecraft port: ')

const { WebcastPushConnection } = require('tiktok-live-connector');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow

function followPlayer() {
  const playerCI = bot.players[nick]

  if (!playerCI || !playerCI.entity) {
      bot.chat("I can't see CI!")
      return
  }

  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)
  movements.scafoldingBlocks = []

  bot.pathfinder.setMovements(movements)

  const goal = new GoalFollow(playerCI.entity, 1)
  bot.pathfinder.setGoal(goal, true)
}

let tiktokUsername = '<your tik tok nickname>';

let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})


const bot = mineflayer.createBot({
    host: "127.0.0.1",
    port: port,
    username: "grzegorz_zyd"
})

bot.loadPlugin(pathfinder)

function startersettings(){
  bot.chat('/gamemode spectator')
}
function chatlog(){
  tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    console.log(data.giftId)
    let forti = data.giftId
    forti = Number(forti)
    if(forti===5655){
      bot.chat('/execute at bonku123 run summon minecraft:zombie ~ ~ ~ {CustomName:"\\"'+data.uniqueId+'\\""}')
    }
    console.log(data.giftId)
})
}
//bot.once('spawn', followPlayer)
bot.once('spawn', chatlog)
bot.once('spawn', startersettings)
