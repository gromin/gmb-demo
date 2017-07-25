import React, { Component } from 'react';
import { Grid } from 'react-redux-grid';

class MachinesGrid extends Component {
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

  gridEvents() {
    return {
      HANDLE_AFTER_INLINE_EDITOR_SAVE: this.onEditSave.bind(this)
    }
  }

  gridRecords() {
    const { machines, searchString } = this.props

    if (searchString.length === 0) {
      return machines
    }
    else {
      return machines.filter((machine) => {
        const { id, ip, name, owner } = machine
        return (
          id.toString().indexOf(searchString) !== -1 ||
          ip.toString().indexOf(searchString) !== -1 ||
          name.toString().indexOf(searchString) !== -1 ||
          owner.toString().indexOf(searchString) !== -1
        )
      })
    }
    
  }

  render() {
    return (
      <Grid stateKey='machines-grid'
            data={this.gridRecords()}
            columns={this.gridColumns()}
            plugins={this.gridPlugins()}
            events={this.gridEvents()} />
    )
  }

  onEditSave({values}) {
    this.props.onSaveMachine(values)
  }
}

export { MachinesGrid }
