export const machines = (state = [], action) => {

  switch (action.type) {

    case 'MACHINE_UPDATE':
      let index = action.machine.id;
      if (index === -1) {
        return state
      }
      else {
        return [
          ...state.slice(0, index),
          action.machine,
          ...state.slice(index)
        ]
      }

    case 'MACHINES_LOAD':
      return action.machines

    default:
      return state
  }
}
