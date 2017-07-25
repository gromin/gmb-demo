import React, { Component } from 'react';
import { Grid } from 'react-redux-grid';
import './App.css';

const Nes = require('nes');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      greeting: null,
      socketGreeting: null,
      machines: []
    }
    this.onSocketUpdate = this.onSocketUpdate.bind(this);
  }

  componentDidMount() {
    this.socketClient = new Nes.Client('ws://localhost:3000/ws');

    this.socketClient
        .connect((err) => {
          this.socketClient.request('/ws', (err, payload) => {
            console.log('socket', payload);
            this.setState({socketGreeting: payload});
          });
        });

    this.socketClient
        .subscribe('/ws/machines',
                   this.onSocketUpdate,
                   this.onSocketSubscribe);

    fetch('/api/greet/user')
      .then(response => response.text())
      .then(response => this.setState({greeting: response}));

    fetch('/api/machines')
      .then(response => response.json())
      .then(response => {
        this.setState({machines: Object.values(response)})
      });
  }

  onSocketSubscribe(err) {}

  onSocketUpdate(update, flags) {
    console.log(update);
  }

  greeting() {
    if (this.state.greeting) {
      return (
        <p className="App-intro">
          {this.state.greeting}
        </p>
      );
    }
    else {
      return null;
    }
  }

  socketGreeting() {
    if (this.state.socketGreeting) {
      return (
        <p className="App-intro">
          {this.state.socketGreeting}
        </p>
      );
    }
    else {
      return null;
    }
  }

  // Grid

  gridWrapper() {
    if (this.state.machines.length > 0) {
      return (
        <Grid stateKey='machines-grid'
              data={this.state.machines}
              columns={this.gridWrapperColumns()}
              plugins={ {EDITOR: {type: 'inline', enabled: true, focusOnEdit: true}, SELECTION_MODEL: {editEvent: 'doubleclick'}} } />
      );
    }
    else {
      return null;
    }
  }

  gridWrapperColumns() {
    return [
      {
        name: 'id',
        dataIndex: 'id',
        sortable: true,
        editable: false
      },
      {
        name: 'Machine name',
        dataIndex: 'name',
        sortable: true,
        editable: true,
        editor: '<input type="text" required />'
      },
      {
        name: 'IP',
        dataIndex: 'ip',
        sortable: true,
        editable: false
      },
      {
        name: 'Owner',
        dataIndex: 'owner',
        sortable: true,
        editable: true,
        editor: '<input type="text" required />'
      }
    ];
  }

  render() {
    return (
      <div className="App">
        { this.greeting() }
        { this.socketGreeting() }
        { this.gridWrapper() }
      </div>
    );
  }
}

export default App;
