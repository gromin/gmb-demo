import React, { Component } from 'react';
import { Grid } from 'react-redux-grid';

class MachinesGrid extends Component {
  constructor(props) {
    super(props)
  }

  gridColumns() {
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

  gridPlugins() {
    return {
      EDITOR: {
        type: 'inline',
        enabled: true,
        focusOnEdit: true
      },
      SELECTION_MODEL: {
        editEvent: 'doubleclick'
      }
    }
  }

  render() {
    return (
      <Grid stateKey='machines-grid'
            data={this.props.machines}
            columns={this.gridColumns()}
            plugins={this.gridPlugins()} />
    )
  }
}

export { MachinesGrid }
