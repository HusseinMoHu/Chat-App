const users = []

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  // Validate the data
  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    }
  }

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.username === username && user.room === room
  })

  // Validate username
  if (existingUser) {
    return {
      error: 'Username already exists!',
    }
  }

  // Store user
  const user = { id, username, room }
  users.push(user)
  return { user }
}

const removeUser = (id) => {
  const indexOfUser = users.findIndex((user) => user.id === id)
  if (indexOfUser !== -1) {
    return users.splice(indexOfUser, 1)[0]
  }
  return { error: 'User not found!' }
}

const getUser = (id) => {
  return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room)
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
}
