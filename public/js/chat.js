const socket = io()

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault() // Prevent page refresh after form submitted

  // Get message from input field by input_name
  const message = e.target.elements.message.value

  socket.emit('sendMessage', message, (message) => {
    // Receive the acknowledgment from server
    console.log('The server has received the message successfully.', message)
  })
})

socket.on('message', (message) => {
  console.log(message)
})

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude
    const long = position.coords.longitude
    socket.emit('sendLocation', { lat, long })
  })
})
