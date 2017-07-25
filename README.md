## Pre-requisites

Git.

Docker, including `docker-machine` and `docker-compose`, set up and running.

## Installation

First,

```
git clone https://github.com/gromin/gmb-demo.git
docker-compose up
```

Then, open in browser http://localhost:3000, and in incognito mode http://localhost:3000.

Changes made to records in one browser should be seen immediately in another.

## Features and Known Issues

There is no conflict resolution -- last write always wins.

Search is local with brute-force, therefore somewhat slow on ~1000 machines.

Data is random and generated on every server restart by faker.

## Used modules

* hapi: server on node.js
* nes: websocket plugin for hapi
* faker: generates fake data, based on locale
* react
* redux
* react-redux-grid: powerful table view a.k.a. grid

## ToDo

* Auth with roles
* Remote search or smart local search
* Editable card for each record on doubleclick
* Persistent store (redis? mongo? postgres?)
