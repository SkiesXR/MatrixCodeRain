const container = document.getElementById('container')  // 'container' element wraps all the body content
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

// create a letter. Have it transition from white to green, then remove it from the DOM
const createAndDestroyLetter = async (char) => {
  const letter = createLetter(char)

  try {
    await addLetter(letter)
    removeLetter(letter)
  } catch (e) {
    console.log('failed to create & destroy letter')
  }
}

// Create the letter element
const createLetter = (char) => {
  const letter = document.createElement('span')
  letter.innerText = `${char}`
  letter.setAttribute('id', `${char}`)
  letter.className = 'animated'
  return letter
}

const addLetter = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(container.appendChild(letter)), 1000))
const removeLetter = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(letter.remove()), 3000))

for (const char of alphabet) {
  createAndDestroyLetter(char)
}
