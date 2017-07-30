const EventEmitter = require('events');
const faker = require('faker');

function genFakeMachine(index) {
  index = index || 0;
  faker.locale = 'ru';
  return {
    ip: faker.internet.ip(),
    name: `dev-${index}`,
    owner: faker.name.findName(),
    isOnline: faker.random.boolean(),
    description: ''
  }
}

class MachinesDb extends EventEmitter {

  constructor(genOnStart) {
    super()

    genOnStart = genOnStart || 0;

    this.machines = {};

    let i = 0;
    while (i++ < genOnStart) {
      this.addMachine(genFakeMachine(i));
    }
  }

  static genUuid(machine) {
    return faker.random.uuid().substr(0, 8);
  }

  all() {
    return this.machines;
  }

  getMachine(id) {
    return this.machines[id];
  }

  addMachine(machine) {
    const id = MachinesDb.genUuid();
    machine.id = id;

    this.machines[id] = machine;
    setImmediate(() => this.emit('add', this.machines[id]));
  }

  updateMachine(id, machineSpec) {
    if (!this.machines[id]) {
      return null;
    }
    this.machines[id] = Object.assign(this.machines[id], machineSpec);
    setImmediate(() => this.emit('update', this.machines[id]));
  }
}

module.exports = MachinesDb;
