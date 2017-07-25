export function updateGreeting(greeting, channel = 'main') {
  return {
    type: 'UPDATE_GREETING',
    channel,
    greeting
  }
}

export function updateSocketGreeting(greeting) {
  return {
    type: 'UPDATE_SOCKET_GREETING',
    greeting
  }
}

export function loadMachines(machines) {
  return {
    type: 'MACHINES_LOAD',
    machines
  }
}

export function updateMachine(machine) {
  return {
    type: 'MACHINE_UPDATE',
    id: machine.id,
    machine
  }
}

export function updateSearch(search) {
  return {
    type: 'SEARCH_UPDATE',
    search
  }
}
