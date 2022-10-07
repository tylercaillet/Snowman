const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]
const container = document.getElementById('alphabetButtons')
const answerDisplay = document.getElementById('hold')
let answer = ''
let hint = ''
let life = 10
let wordDisplay = []
let winningCheck = ''
const containerHint = document.getElementById('clue')
const buttonHint = document.getElementById('hint')
const buttonReset = document.getElementById('reset')
const livesDisplay = document.getElementById('mylives')
let mySnowman = document.getElementById('snowman')
let context = mySnowman.getContext('2d')

const generateButton = () => {
  const buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(
      (letter) =>
        `<button
           class = "alphabetButtonJS" 
           id="${letter}"
           >
          ${letter}
          </button>`
    )
    .join('')

  return buttonsHTML
}

const handleClick = (event) => {
  const isButton = event.target.nodeName === 'BUTTON'
  if (isButton) {
    const buttonId = document.getElementById(event.target.id)
    buttonId.classList.add('selected')
  }
  return
}

const question = [
  'The Chosen Category Is Sports',
  'The Chosen Category Is Foods',
  'The Chosen Category Is Cars'
]

const categories = [
  ['soccer', 'baseball', 'football', 'basketball', 'tennis', 'lacrose'],
  ['pasta', 'burger', 'salad', 'steak', 'sandwich'],
  ['ferrari', 'lamborghini', 'honda', 'acura', 'porsche', 'audi']
]

const hints = [
  [
    'another name for it is football',
    'There are typically nine innings ',
    'The Denver Broncos are a team of this sport',
    'Shaq used to be the best player in this sport',
    'You have to hit a ball over the net in this sport',
    'This sport is similar to hockey, but its played on football field'
  ],
  [
    'Long string of noodles',
    'hand-held sandwich',
    'its got greens AND its healthy for you!',
    'delicious slab of meat that is best cooked at medium tempurature',
    'a classic picnic food item'
  ],
  [
    'looks best in cherry red spray paint and has about 711hp',
    'my favorite car ;)',
    'the largest manufacturer of cars around the world',
    'the first japanese luxury car in America',
    'the first brand that sold passenger airbags as a standard',
    'this car brand is latin for listen'
  ]
]

const setAnswer = () => {
  const categoryOrder = Math.floor(Math.random() * categories.length)
  const chosenCategory = categories[categoryOrder]
  const wordOrder = Math.floor(Math.random() * chosenCategory.length)
  const chosenWord = chosenCategory[wordOrder]

  const categoryName = document.getElementById('categoryName')
  categoryName.innerHTML = question[categoryOrder]
  answer = chosenWord
  hint = hints[categoryOrder][wordOrder]
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord)
}

const generateAnswerDisplay = (word) => {
  let wordArray = word.split('')
  for (let i = 0; i < answer.length; i++) {
    if (wordArray[i] !== '-') {
      wordDisplay.push('_')
    } else {
      wordDisplay.push('-')
    }
  }
  return wordDisplay.join(' ')
}

const showHint = () => {
  containerHint.innerHTML = `Clue - ${hint}`
}

buttonHint.addEventListener('click', showHint)

const init = () => {
  answer = ''
  hint = ''
  life = 10
  wordDisplay = []
  winningCheck = ''
  context.clearRect(0, 0, 400, 400)
  canvas()
  containerHint.innerHTML = `Clue `
  livesDisplay.innerHTML = `You have ${life} lives!`
  setAnswer()
  container.innerHTML = generateButton()
  container.addEventListener('click', handleClick)
  console.log(answer)
}

buttonReset.addEventListener('click', init)

const guess = (event) => {
  const guessWord = event.target.id
  const answerArray = answer.split('')
  let counter = 0
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `YOU WIN!`
    return
  } else {
    if (life > 0) {
      for (let j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord
          console.log(guessWord)
          answerDisplay.innerHTML = wordDisplay.join(' ')
          winningCheck = wordDisplay.join('')
          counter += 1
        }
      }
      if (counter === 0) {
        life -= 1
        counter = 0
        animate()
      } else {
        counter = 0
      }
      if (life > 1) {
        livesDisplay.innerHTML = `You have ${life} lives!`
      } else if (life === 1) {
        livesDisplay.innerHTML = `You have ${life} life!`
      } else {
        livesDisplay.innerHTML = `GAME OVER!`
      }
    } else {
      return
    }
    console.log(wordDisplay)
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `YOU WIN!`
      return
    }
  }
}

container.addEventListener('click', guess)

const animate = () => {
  drawArray[life]()
}

const canvas = () => {
  mySnowman = document.getElementById('snowman')
  context = mySnowman.getContext('2d')
  context.beginPath()
  context.strokeStyle = '#fff'
  context.lineWidth = 2
}

const head = () => {
  mySnowman = document.getElementById('snowman')
  context = mySnowman.getContext('2d')
  context.beginPath()
  context.arc(60, 25, 10, 0, Math.PI * 2, true)
  context.stroke()
}

const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
  context.moveTo($pathFromx, $pathFromy)
  context.lineTo($pathTox, $pathToy)
  context.stroke()
}

const frame1 = () => {
  draw(0, 150, 150, 150)
}

const frame2 = () => {
  draw(10, 0, 10, 600)
}

const frame3 = () => {
  draw(0, 5, 70, 5)
}

const frame4 = () => {
  draw(60, 5, 60, 15)
}

const torso = () => {
  draw(60, 36, 60, 70)
}

const rightArm = () => {
  draw(60, 46, 100, 50)
}

const leftArm = () => {
  draw(60, 46, 20, 50)
}

const rightLeg = () => {
  draw(60, 70, 100, 100)
}

const leftLeg = () => {
  draw(60, 70, 20, 100)
}

const drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
]
