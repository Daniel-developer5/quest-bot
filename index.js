require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, { polling: true, })
const messages = require('./messages')
const state = require('./state')

const teamsData = JSON.parse(process.env.teams)
const locations = JSON.parse(process.env.locations)

bot.onText(/\/start/, ({ chat }) => {
  bot.sendMessage(
    chat.id,
    messages.start + (!state.teamKey ? messages.getTeamKey : '')
  )
})

// bot.onText(/^\/code/, ({ chat }) => {
//   bot.sendMessage(chat.id, messages.code)
//   state.isWaitForCode = true
// })

bot.onText(/^\/emoji/, ({ chat }) => {
  if (!state.teams[chat.id]) {
    bot.sendMessage(chat.id, messages.noTeamKey)
    return
  }

  bot.sendMessage(chat.id, messages.getEmojiLocation)
  state.teams[chat.id].isWaitForLocation = true
})

// const errCode = (id, message = messages.noCode) => {
//   bot.sendMessage(id, message)
//   state.isWaitForCode = false
// }

const waitForTeamKey = msg => {
  if (msg.text) {
    if (/(\/start|\/emoji)/.test(msg.text)) {
      return
    }

    if (!Object.keys(teamsData).some(key => key === msg.text)) {
      bot.sendMessage(msg.chat.id, messages.invalidTeamKey)
      return
    }

    state.teams[msg.chat.id] = {
      isWaitForCode: false,
      isWaitForLocation: false,
      locationCode: null,
      teamKey: msg.text,
    }

    console.log(state.teams)
    bot.sendMessage(msg.chat.id, 'saved')
  } else {
    bot.sendMessage(msg.chat.id, messages.invalidTeamKey)
  }
}

const waitForLocation = msg => {
  const { text } = msg
  const { id } = msg.chat

  if (
    !+text || !text.trim() ||
    !locations.some(location => location === +text)
  ) {
    bot.sendMessage(id, messages.noLocation)
    state.teams[id].isWaitForLocation = false
  } else {
    bot.sendMessage(id, messages.getEmojiCode)
    state.teams[id].isWaitForLocation = false
    state.teams[id].locationCode = +text
  }
}

const waitForLocationCode = msg => {
  const { id } = msg.chat
  const activeTeam = state.teams[id]
  const team = teamsData[activeTeam.teamKey]

  const code = String(team.codes[activeTeam.locationCode - 1])
  const emoji = team.emojies[activeTeam.locationCode - 1]

  if (msg.text.toLowerCase() === code.toLowerCase()) {
    bot.sendMessage(id, emoji)
    state.teams[id].locationCode = null
  } else {
    bot.sendMessage(id, messages.invalidLocationCode)
    state.teams[id].locationCode = null
  }
}

bot.on('message', msg => {
  const { id } = msg.chat

  if (!state.teams[id]) {
    waitForTeamKey(msg)
    return
  }

  if (state.teams[id].isWaitForLocation) {
    waitForLocation(msg)
    return
  }

  if (state.teams[id].locationCode) {
    waitForLocationCode(msg)
    return
  }

  // if (state.isWaitForCode) {
  //   if (!msg.text) {
  //     errCode(msg.chat.id)
  //     return
  //   }

  //   const code = msg.text.match(/(?<!\d)\d{8}(?!\d)/g)?.[0]

  //   if (!code) {
  //     errCode(msg.chat.id)
  //   } else {
  //     if (code !== process.env.CODE) {
  //       errCode(msg.chat.id, messages.errCode(code))
  //     } else {
  //       bot.sendMessage(msg.chat.id, messages.trueCode, { parse_mode: 'HTML', })
  //       state.isWaitForCode = false
  //     }
  //   }
  // }
})

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.listen(PORT)


// TODO: Add feature to log into existing team with saved history
