const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

// Create the letter element, have it animate from white to green and then remove opacity
const createLetter = (char) => {
  const letter = document.createElement('span')
  letter.innerText = `${char}`
  letter.setAttribute('id', `${char}`)
  letter.className = 'animated'
  return letter
}

const removeLetter = (letter) => setTimeout(() => letter.remove(), 3000)

// Add & remove letter from DOM
const createAndDestroyLetter = (char, containerIndex) => {
  const letter = createLetter(char)
  setTimeout(() => {
    document.getElementById(`container-${containerIndex}`).appendChild(letter)
  }, 1000)
  setTimeout(() => letter.classList.add('invisible'), 3000)
}

const createContainer = (containerIndex) => {
  const container = document.createElement('div')
  container.setAttribute('id', `container-${containerIndex}`)
  container.className = 'container'
  document.body.appendChild(container)
}

// Iterate through alphabet, create / destroy all chars
const loopThroughAlphabet = (containerIdx) => alphabet.forEach((char, i) => {
  setTimeout(() => {
    createAndDestroyLetter(char, containerIdx)
  }, i * 100)
})

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    createContainer(i)
    loopThroughAlphabet(i)
  }, i * 1000)
}


