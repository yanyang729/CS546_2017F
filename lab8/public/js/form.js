/**
 * Created by yangyang on 11/5/17.
 */
(function () {

  const staticForm = document.getElementById('static-form')

  if (staticForm) {

    const userInputElement = document.getElementById('userInput')

    const errorContainer = document.getElementById('error-container')
    const errorTextElement = errorContainer.getElementsByClassName(
      'text-goes-here'
    )[0]

    const resultContainer = document.getElementById('result-container')

    // We can take advantage of functional scoping; our event listener has access to its outer functional scope
    // This means that these variables are accessible in our callback
    staticForm.addEventListener('submit', event => {
      event.preventDefault()

      try {
        // hide containers by default
        errorContainer.classList.add('hidden')
        resultContainer.classList.add('hidden')

        const userInput = userInputElement.value

        if (!userInput) throw 'Input cannot be empty.'

        let cleaned = userInput.replace(/[^\w\s]/gi, '').toLocaleLowerCase()
        let reversed = cleaned.split('').reverse().join('')
        let node = document.createElement('li')
        let textnode = document.createTextNode(userInput)


        if (cleaned === reversed) {
          node.className += 'is-palindrome'
          node.appendChild(textnode)
          resultContainer.classList.remove('hidden')
          document.getElementById("result-list").appendChild(node)
        } else {
          node.className += 'not-palindrome'
          node.appendChild(textnode)
          resultContainer.classList.remove('hidden')
          document.getElementById("result-list").appendChild(node)
        }

      } catch (e) {
        const message = typeof e === 'string' ? e : e.message
        errorTextElement.textContent = message
        errorContainer.classList.remove('hidden')
      }
    })
  }
})()