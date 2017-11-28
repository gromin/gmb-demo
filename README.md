## Prerequisites

Git.

Docker, including `docker-machine` and `docker-compose`, set up and running. (Guaranteed to work under Docker for Mac. Currently don't properly start up under Linux--need to fix mounted volumes.)

## Installation

First,

```
git clone https://github.com/gromin/gmb-demo.git
docker-compose up
```

Then, open in browser http://localhost:3000, and in incognito mode http://localhost:3000.

Log in using one of predefined accounts: `writer@example.com / writer` or `reader@example.com / reader`.

Doubleclick on row to see its more detailed card. Account `writer@example.com` can use this card to edit machine's properties. Account `reader@example.com` can see this card in readonly mode.

Changes made to records in one browser should be seen immediately in another.

## Features and Known Issues

There is no conflict resolution -- last write always wins.

Search is local with brute-force, therefore somewhat slow on ~1000 machines. Same for sorting.

Data is random and generated on every server restart by faker.

## Used modules

* hapi: server on node.js
* nes: websocket plugin for hapi
* faker: generates fake data, based on locale
* react
* redux
* react-redux-grid: powerful table view a.k.a. grid
* react-bootstrap
* react-overlays

## ToDo

* Add loading states to UI
* Remote search or smart local search
* Persistent store (redis? mongo? postgres?)
