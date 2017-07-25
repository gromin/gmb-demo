export const greeting = (state = {main: ''}, action) => {

  switch (action.type) {

    case 'UPDATE_GREETING':
      return {
        ...state,
        [action.channel || 'main']: action.greeting
      }

    default:
      return state
  }
}
