export function updateGreeting(greeting) {
  return {
    type: 'UPDATE_GREETING',
    greeting: greeting
  }
}

export function updateSocketGreeting(greeting) {
  return {
    type: 'UPDATE_SOCKET_GREETING',
    greeting: greeting
  }
}

export function loadMachines(machines) {
  return {
    type: 'MACHINES_LOAD',
    machines: machines
  }
}

export function updateMachine(machine) {
  return {
    type: 'MACHINES_LOAD',
    id: machine.id,
    machine: machine
  }
}
