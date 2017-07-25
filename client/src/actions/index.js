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
    type: 'MACHINE_UPDATE',
    id: machine.id,
    machine: machine
  }
}
