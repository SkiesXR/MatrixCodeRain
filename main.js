// 'container' element wraps all the body content
const container = document.getElementById('container')

// create a letter. Have it transition from white to green, then remove it from the DOM
const createAndDestroyLetter = async () => {
  const letter = createLetter()

  try {
    await addLetter(letter)
    removeLetter(letter)
  } catch (e) {
    console.log('failed to create & destroy letter')
  }
}

// Create the letter element
const createLetter = () => {
  const letter = document.createElement('span')
  letter.innerText = 'a'
  letter.setAttribute('id', 'a')
  letter.className = 'animated'
  return letter
}

const addLetter = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(container.appendChild(letter)), 1000))
const removeLetter = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(letter.remove()), 3000))

createAndDestroyLetter()