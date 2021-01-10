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

const addLetter = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(container.appendChild(letter)), 1000))
const removeLetter = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(letter.remove()), 3000))

// Add & remove letter from DOM
const createAndDestroyLetter = async (char) => {
  const letter = createLetter(char)

  try {
    await addLetter(letter)
    removeLetter(letter)
  } catch (e) {
    console.log('failed to create & destroy letter')
  }
}

// Iterate through alphabet, create / destroy all chars
alphabet.forEach((char, i) => {
  setTimeout(() => {
      createAndDestroyLetter(char)
  }, i * 1000)
})

