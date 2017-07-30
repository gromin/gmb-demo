import React, { Component } from 'react';
import { Grid, applyGridConfig, Actions as GridActions } from 'react-redux-grid';

import './MachinesGrid.css';

class MachinesGrid extends Component {
  constructor(props) {
    super(props)
    applyGridConfig({
      CSS_PREFIX: '',
      CLASS_NAMES: {
        CONTAINER: '',
        TABLE: 'table table-striped table-bordered table-hover',
        HEADER_HIDDEN: 'header-hidden',
        ROW: 'row-override',
        CELL: 'text-left',
        ERROR_HANDLER: {
          CONTAINER: 'hidden'
        }
      }
    })
  }

  gridColumns() {
    return [
      {
        name: 'Machine ID',
        dataIndex: 'id',
        sortable: true,
        editable: false,
        width: '15%'
      },
      {
        name: 'IP Address',
        dataIndex: 'ip',
        sortable: true,
        editable: false,
        width: '25%'
      },
      {
        name: 'Machine name',
        dataIndex: 'name',
        sortable: true,
        editable: true,
        editor: '<input type="text" required />',
        width: '20%'
      },
      {
        name: 'Owner',
        dataIndex: 'owner',
        sortable: true,
        editable: true,
        editor: '<input type="text" required />',
        width: '40%'
      }
    ];
  }

  gridPlugins() {
    return {
      SELECTION_MODEL: {
        activeCls: 'info',
        allowDeselect: false
      }
    }
  }

  gridEvents() {
    return {
      // HANDLE_CELL_CLICK: this.onRowClick.bind(this),
      HANDLE_AFTER_SELECTION: this.onRowSelection.bind(this)
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
    const records = this.gridRecords()
    if (this.props.selectedMachine && this.props.selectedMachine._key) {
      setTimeout(() => {
        this.props.dispatch(GridActions.SelectionActions.selectAll({stateKey: 'machines-grid', data: {currentRecords: [this.props.selectedMachine]}}))
      }, 100)
    }

    setTimeout(() => {
      // this.props.dispatch({type: '@@react-redux-grid/SELECT_ALL', selection: {'row-0': true}, stateKey: 'machines-grid', indexes: [5]})
      // this.props.dispatch(GridActions.SelectionActions.selectAll({stateKey: 'machines-grid', data: {currentRecords: [this.gridRecords()[0]]}}))
    }, 3000)
    return (
      <Grid stateKey='machines-grid'
            data={records}
            columns={this.gridColumns()}
            plugins={this.gridPlugins()}
            events={this.gridEvents()}
            height={null} />
    )
  }

  onRowSelection({data}) {
    this.props.onRowSelect(data.id)
  }
}

export { MachinesGrid }
