const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault() // Prevent page refresh after form submitted

  // disable button after send msg
  $messageFormButton.setAttribute('disabled', 'disabled')

  const message = e.target.elements.message.value

  socket.emit('sendMessage', message, (error) => {
    // enable button after msg is sent
    $messageFormButton.removeAttribute('disabled')
    // clear input field
    $messageFormInput.value = ''
    $messageFormInput.focus()

    // Check profanity
    if (error) {
      return console.log(error)
    }

    console.log('Message delivered.')
  })
})

socket.on('message', (message) => {
  console.log(message)
})

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  $sendLocationButton.setAttribute('disabled', 'disabled')

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude
    const long = position.coords.longitude

    socket.emit('sendLocation', { lat, long }, () => {
      $sendLocationButton.removeAttribute('disabled')
      console.log('Location shared!')
    })
  })
})
