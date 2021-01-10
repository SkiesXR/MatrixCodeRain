// container states
const empty = 'empty'
const filling = 'filling'
const finished = 'finished'

// vars
const containerWidth = 15  // width (in pixels) of each container
const characterHeight = 18 // height (in pixels) of each character
const characterCreationDelay = 100 // delay in milliseconds when creating new characters
const containerCreationDelay = 250 // delay in milliseconds when creating new containers
const rerunMatrixCodeDelay = 22000 // delay in milliseconds to rerun the simulation
const numContainers = window.innerWidth / containerWidth  // number of vertical containers of Matrix code
const numVerticalCharacters = window.innerHeight / characterHeight  // number of characters to display in each container
const alphabet = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:・."=*+-<>¦｜çﾘ'.toUpperCase().split('')  // characters to display

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

// Create a vertical container that holds Matrix characters
const createContainer = (containerIndex) => {
  const container = document.createElement('div')
  container.className = 'container'
  container.setAttribute('id', `container-${containerIndex}`)
  document.body.appendChild(container)
}

// Create containers across the width of the screen
const createContainers = () => {
  const containers = []
  const containerStates = {}
  for (let i = 0; i < numContainers; i++) {
    createContainer(i)
    containers.push(i)
  }

  containers.forEach(container => containerStates[container] = 'empty')
  return containerStates
}

function createMatrixCode () {
  this.state = { ... createContainers()}
  const shuffledContainerIndexes = shuffle(Object.keys(this.state))
  
  shuffledContainerIndexes.forEach((containerIndex, i) => {
    // if (i === shuffledContainerIndexes.length - 1) {
    //   setTimeout(() => destroyAndRerun(), rerunMatrixCodeDelay)
    // }
    setTimeout(() => fillContainer(containerIndex), i * containerCreationDelay)
  })

  // Create the letter element, have it animate from white to green and then remove opacity
  const createLetter = (char, containerIndex, verticalCharacterIndex) => {
    const letter = document.createElement('span')
    letter.innerText = `${char}`
    letter.setAttribute('id', `${containerIndex}-${verticalCharacterIndex}`)
    return letter
  }

  // Randomly change letters before they disappear
  const changeLetter = (letter) => {
    const randomCharIdx = Math.floor(Math.random() * alphabet.length)
    letter.innerText = `${alphabet[randomCharIdx]}`
  }

  const createAndDestroyLetter = (char, containerIndex, verticalCharacterIndex) => {
    const letter = createLetter(char, containerIndex, verticalCharacterIndex)
    setTimeout(() => document.getElementById(`container-${containerIndex}`).appendChild(letter), 1000)

    // Randomly determine letters that should swap characters
    Math.random() < 0.5 && setTimeout(() => changeLetter(letter), 2000)
  }

  // Iterate through length of container creating & destroying random chars
  const fillContainer = (containerIndex) => {
    for (let i = 0; i < numVerticalCharacters; i++) {
      const idx = Math.floor(Math.random() * alphabet.length)
      setTimeout(() => {
        createAndDestroyLetter(alphabet[idx], containerIndex, i)
      }, i * characterCreationDelay)
    }
  }

  // TODO: A bit too hacky.. need a cleaner solution
  const destroyAndRerun = () => {
  document.body.innerHTML = ""
  createMatrixCode()
}
}

createMatrixCode()
