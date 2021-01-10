// 'container' element wraps all the body content
const container = document.getElementById('container')

// create a letter and have it transition from white to green
const createAndDestroyLetter = () => {
  const letter = document.createElement('span')
  letter.innerText = 'a'
  letter.setAttribute('id', 'a')
  letter.className = 'animated'

  // attempt to create & destroy letter. Log error if this process fails
  try {
    create(letter).then(() => destroy(letter))
  } catch (e) {
    console.log('failed to create & destroy letter')
  }
}

const create = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(container.appendChild(letter)), 1000))
const destroy = (letter) => new Promise((resolve, reject) => setTimeout(() => resolve(letter.remove()), 3000))

createAndDestroyLetter()