'use strict';

const Hapi = require('hapi');
const Nes = require('nes');

const MachinesDb = require('./services/machines_db');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });

server.register([Nes], function(err) {

    server.subscription('/ws/machines');

    server.route({
        method: 'GET',
        path: '/api/greet',
        handler: function (request, reply) {
            reply('Hello, world!');
        }
    });

    server.route({
        method: 'GET',
        path: '/api/greet/{name}',
        handler: function (request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    });

    server.route({
        method: 'GET',
        path: '/api/machines',
        handler: function (request, reply) {
            reply(server.machines.all());
        }
    });

    server.route({
        method: 'POST',
        path: '/api/machines',
        handler: function (request, reply) {
            const machineSpec = JSON.parse(request.payload);
            const machine = server.machines.addMachine(machineSpec);
            if (machine) {
                reply(machine);
            }
            else {
                reply('').code(204);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/machines/{id}',
        handler: function (request, reply) {
            const machine = server.machines.getMachine(request.params.id);
            if (machine) {
                reply(machine);
            } else {
                reply('').code(404);
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/machines/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            const machineSpec = JSON.parse(request.payload);

            let machine = server.machines.getMachine(id);
            if (!machine) {
                reply('').code(404);
                return;
            }
            machine = server.machines.updateMachine(id, machineSpec);
            reply(machine);
        }
    });

    server.route({
        method: 'GET',
        path: '/ws',
        config: {
            id: 'websocket',
            handler: function(request, reply) {
                return reply('Hello from websocket');
            }
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);

        const machines = new MachinesDb(1000);
        server.machines = machines;

        machines.on('add', (machine) => {
            server.publish('/ws/machines', machine);
        });

        machines.on('update', (machine) => {
            server.publish('/ws/machines', machine);
        });
    });
});
