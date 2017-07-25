export const greeting = (state = 'Hello unknown', action) => {

  switch (action.type) {

    case 'UPDATE_GREETING':
      return action.greeting

    default:
      return state
  }
}


export const socketGreeting = (state = 'No echo from websocket', action) => {

  switch (action.type) {

    case 'UPDATE_SOCKET_GREETING':
      return action.greeting

    default:
      return state
  }
}
