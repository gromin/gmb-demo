export const selectedMachine = (state = null, action) => {

  switch (action.type) {

    case 'UPDATE_SELECTED_MACHINE':
      return action.id;

    default:
      return state
  }
}
