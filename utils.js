import { empty } from './constants.js'

const containerWidth = 15  // width (in pixels) of each container
const numContainers = Math.floor(window.innerWidth / containerWidth)  // number of vertical containers of Matrix code

// Fisher-Yates shuffle
export const shuffle = (array) => {
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
export const createContainer = (containerIndex) => {
  const container = document.createElement('div')
  container.className = 'container'
  container.setAttribute('id', `container-${containerIndex}`)
  document.body.appendChild(container)
}

// Create containers across the width of the screen
export const createContainers = () => {
  const containers = []
  const containerStates = {}
  for (let i = 0; i < numContainers; i++) {
    createContainer(i)
    containers.push(i)
  }

  containers.forEach(container => containerStates[container] = empty)
  return containerStates
}