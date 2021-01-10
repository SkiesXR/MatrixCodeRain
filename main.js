const containerWidth = 15  // width (in pixels) of each container
const characterHeight = 18 // height (in pixels) of each character
const characterCreationDelay = 100 // delay in milliseconds when creating new characters
const containerCreationDelay = 250 // delay in milliseconds when creating new containers
const numContainers = window.innerWidth / containerWidth  // number of vertical containers of Matrix code
const numVerticalCharacters = window.innerHeight / characterHeight  // number of characters to display in each container
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')  // characters to display

// Fisher-Yates shuffle
const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Create the letter element, have it animate from white to green and then remove opacity
const createLetter = (char) => {
  const letter = document.createElement('span')
  letter.innerText = `${char}`
  letter.setAttribute('id', `${char}`)
  return letter
}

// Add & remove letter from DOM
const createAndDestroyLetter = (char, containerIndex) => {
  const letter = createLetter(char)
  setTimeout(() => document.getElementById(`container-${containerIndex}`).appendChild(letter), 1000)
  setTimeout(() => letter.classList.add('invisible'), 6000)
}

const createContainer = (containerIndex) => {
  const container = document.createElement('div')
  container.className = 'container'
  container.setAttribute('id', `container-${containerIndex}`)
  document.body.appendChild(container)
}

// Iterate through length of container creating & destroying random chars
const fillContainer = (containerIndex) => {
  for (let i = 0; i < numVerticalCharacters; i++) {
    const idx = Math.floor(Math.random() * alphabet.length)
    setTimeout(() => {
      createAndDestroyLetter(alphabet[idx], containerIndex)
    }, i * characterCreationDelay)
  }
}


const createContainers = () => {
  const containers = []
  for (let i = 0; i < numContainers; i++) {
    createContainer(i)
    containers.push(i)
  }

  return containers
}

(function createMatrixCode () {
  const containerIndexes = createContainers()
  const shuffledContainerIndexes = shuffle(containerIndexes)
  
  shuffledContainerIndexes.forEach((containerIndex, i) => {
    setTimeout(() => fillContainer(containerIndex), i * containerCreationDelay)
  })
})()


