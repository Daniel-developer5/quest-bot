const removeTabs = str => str.split('\n').map(row => row.replace(/\s(?=\s)/g, '').trim()).join('\n')

// const legacyHi = `
//   Хей! Радий, що знайшли мене.
//   Я ваш бот-помічник у проходженні квесту 😲

//   Що вам слід робити? 
//   Я очікую від вас 8-ми значний код, якщо ви знайдете його - отримаєте клад! 🏴‍☠️
//   Отже, перед вами 8 локацій, на кожній з яких ви отримаєте одну цифру кода.
//   Слідуйте всім правилам, проходячи по черзі кожну з локацій.
//   Карту в руки і ВПЕРЕЕЕД!

//   Надішліть команду /code, коли знайдете всі 8 цифр.
// `

const start = `
  привітання...
`

const trueCode = `
  Молодці! Ви добре впоралися із завданням!
  Люди, які ховали клад, серйозно попрацювали над його захистом, тому все, що нам про нього відомо - ось цей набір цифр.
  Спробуйте розгадати шифр, ви вже зовсім близько!

  <code>49.474994,
  31.988583</code>

  Ті, хто ховали клад залишили записку, здається, вона не зовсім інформативна...

  <i>"Ха, ха, ха! Ми знаємо, що майже ніхто не вчить географію. Поки ви кажете, що вона вам не потрібна, училка розкопує вже другий клад!"</i>
`

const gettedEmojiText = (emoji, history) => `
  Вітаю, ви отримали emoji: ${emoji}

  Зібрані emojies: ${history}
`

const task = `
  😛 * 😉 = 6
  😉 < 😛
  🙃 * (🙃 * 🙃) * 🙃 = 1
  (🙃 + 😉 + 😛) * 🧐 = 30
  😳 + 🧐 - 😛 = 9

  😛 * 🧐 - 😳 + 🙃 - 😉 * 😉 + 🙃 = ?
`

module.exports = {
  start: removeTabs(start),
  code: 'Надішліть ваш код:',
  noCode: 'Ви не надіслали 8-ми значний код, уведіть команду /code ще раз, якщо хочете повторити спробу.',
  errCode: code => `Ви надіслали код: ${code}. Нажаль, він не вірний :(. Перевірьте чи знайшли правильні цирфри на локаціях та введіть команду /code.`,
  trueCode: removeTabs(trueCode),
  getEmojiLocation: 'Надішліть номер локації:',
  noLocation: 'Невірний номер локації, введіть комадну /emoji, щоб повторити спробу.',
  getEmojiCode: 'Надішліть код, отриманий на локації:',
  invalidLocationCode: 'Код невірний, введіть комадну /emoji, щоб повторити спробу.',
  invalidTeamKey: 'Невалідний код команди, введіть ще раз:',
  getTeamKey: '\nНадішліть колір команди:',
  noTeamKey: 'Ви не надіслали колір команди, надішліть колір команди:',
  newTeam: 'Вітаю в грі! Проходьте локації за наданою хронологією. /emoji',
  gettedEmoji: (emoji, history) => removeTabs(gettedEmojiText(emoji, history)),
  wantTask: 'хочу задачу',
  task: removeTabs,
  noPhoto: 'no photo, введіть комадну /emoji, щоб повторити спробу.',
  repetedEmoji: 'you have already got this emoji, /emoji',
}