export const userCanWrite = (state = false, action) => {

  switch (action.type) {

    case 'UPDATE_USER_CAN_WRITE':
      return action.canWrite

    default:
      return state
  }
}
