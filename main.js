const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

// Create the letter element, have it animate from white to green and then remove opacity
const createLetter = (char) => {
  const letter = document.createElement('span')
  letter.innerText = `${char}`
  letter.setAttribute('id', `${char}`)
  letter.className = 'animated'
  return letter
}

// Add & remove letter from DOM
const createAndDestroyLetter = (char, containerIndex) => {
  const letter = createLetter(char)
  setTimeout(() => {
    document.getElementById(`container-${containerIndex}`).appendChild(letter)
  }, 1000)
  setTimeout(() => letter.classList.add('invisible'), 10000)
}

const createContainer = (containerIndex) => {
  const container = document.createElement('div')
  container.setAttribute('id', `container-${containerIndex}`)
  container.className = 'container'
  document.body.appendChild(container)
}

// Iterate through length of alphabet creating & destroying random chars
const fillContainer = (containerIndex) => {
  for (let i = 0; i < 100; i++) {
    const idx = Math.floor(Math.random() * alphabet.length)
    setTimeout(() => {
      createAndDestroyLetter(alphabet[idx], containerIndex)
    }, i * 100)
  }
}

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    createContainer(i)
    fillContainer(i)
    setTimeout(() => document.getElementById(`container-${i}`).remove(), 15000)
  }, i * 1000)
}


