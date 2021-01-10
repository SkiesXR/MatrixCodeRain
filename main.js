const container = document.getElementById('container')  // this element wraps all the body content
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

// Create the letter element, have it animate from white to green and then remove opacity
const createLetter = (char) => {
  const letter = document.createElement('span')
  letter.innerText = `${char}`
  letter.setAttribute('id', `${char}`)
  letter.className = 'animated'
  return letter
}

const addLetter = (letter) => setTimeout(() => container.appendChild(letter), 1000)
const removeLetter = (letter) => setTimeout(() => letter.remove(), 3000)
const hideLetter = (letter) => setTimeout(() => letter.classList.add('invisible'), 3000)

// Add & remove letter from DOM
const createAndDestroyLetter = (char) => {
  const letter = createLetter(char)
  addLetter(letter)
  hideLetter(letter)
}

// Iterate through alphabet, create / destroy all chars
alphabet.forEach((char, i) => {
  setTimeout(() => createAndDestroyLetter(char), i * 1000)
})

