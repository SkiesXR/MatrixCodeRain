import { shuffle, createContainers } from './utils.js'
import { filling, finished } from './constants.js'

(function createMatrixCode () {
  // vars
  const characterHeight = 18 // height (in pixels) of each character
  const characterCreationDelay = 100 // delay in milliseconds when creating new characters
  const containerCreationDelay = 250 // delay in milliseconds when creating new containers
  const containerRefillDelay = Math.floor(Math.random() * 10000) // delay in milliseconds to rerun the simulation
  const numVerticalCharacters = Math.floor(window.innerHeight / characterHeight)  // number of characters to display in each container
  const alphabet = 'abcdefghijklmnopqrstuvwxyxz0123456789'.split('')  // characters to display
  const state = { ... createContainers()}
  const shuffledContainerIndexes = shuffle(Object.keys(state))

  function fillAllContainers() {
    let index = 0;
    const timer = setInterval(() => {
      fillContainer(shuffledContainerIndexes[index])
      index++
      if (index === shuffledContainerIndexes.length) clearInterval(timer)
    }, 100)
  }

  // Create the letter element, have it animate from white to green and then remove opacity
  const createLetter = (char, containerIndex, verticalCharacterIndex) => {
    const letter = document.createElement('span')
    letter.innerText = `${char}`
    letter.setAttribute('id', `${containerIndex}-${verticalCharacterIndex}`)
    if (verticalCharacterIndex === numVerticalCharacters - 1) {
      state[verticalCharacterIndex] = finished
      setTimeout(() => emptyAndRefillContainer(containerIndex), containerRefillDelay)
    }
    return letter
  }

  // Randomly change letters before they disappear
  const changeLetter = (letter) => {
    const randomCharIdx = Math.floor(Math.random() * alphabet.length)
    letter.innerText = `${alphabet[randomCharIdx]}`
  }

  const createAndDestroyLetter = (char, containerIndex, verticalCharacterIndex) => {
    const letter = createLetter(char, containerIndex, verticalCharacterIndex)
    document.getElementById(`container-${containerIndex}`).appendChild(letter)

    // Randomly determine letters that should swap characters
    Math.random() < 0.5 && setTimeout(() => changeLetter(letter), 2000)
  }

  // Iterate through length of container creating & destroying random chars
  const fillContainer = (containerIndex) => {
    state[containerIndex] = filling

    let index = 0;
    const timer = setInterval(() => {
      const idx = Math.floor(Math.random() * alphabet.length)
      createAndDestroyLetter(alphabet[idx], containerIndex, index)
      index++
      if (index === numVerticalCharacters.length) clearInterval(timer)
    }, characterCreationDelay)
  }

  // Empty a container, refill with characters
  const emptyAndRefillContainer = (containerIndex) => {
    const container = document.getElementById(`container-${containerIndex}`)
    container.innerHTML = ""
    fillContainer(containerIndex)
  }

  fillAllContainers()
})()
