// create a letter and have it transition from white to green
const letter = document.createElement('span')
letter.innerText = 'a'
letter.className = 'animated'
const container = document.getElementById('container')

// Delay the letter being added to the page
setTimeout(() => container.appendChild(letter), 3000)