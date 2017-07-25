export const machines = (state = [], action) => {

  switch (action.type) {

    case 'MACHINE_UPDATE':
      let index = state.findIndex((machine) => machine.id === action.machine.id)
      if (index === -1) {
        return state
      }
      else {
        return [
          ...state.slice(0, index),
          {...state[index], ...action.machine},
          ...state.slice(index + 1)
        ]
      }

    case 'MACHINES_LOAD':
      return action.machines

    default:
      return state
  }
}
