// 'container' element wraps all the body content
const container = document.getElementById('container')

// create a letter and have it transition from white to green
const createAndDestroyLetter = () => {
  const letter = document.createElement('span')
  letter.innerText = 'a'
  letter.setAttribute('id', 'a')
  letter.className = 'animated'
  setTimeout(() => container.appendChild(letter), 1000)
}

// Remove the letter from the page
const removeLetter = () => setTimeout(() => document.getElementById('a').remove(), 3000)

createAndDestroyLetter()