const socket = io()

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault() // Prevent page refresh after form submitted

  // Get message from input field by input_name
  const message = e.target.elements.message.value

  socket.emit('sendMessage', message)
})

socket.on('message', (message) => {
  console.log(message)
})
