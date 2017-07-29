import React, { Component } from 'react';
import { Grid, applyGridConfig } from 'react-redux-grid';

import './MachinesGrid.css';

class MachinesGrid extends Component {
  constructor(props) {
    super(props)
    applyGridConfig({
      CLASS_NAMES: {
        CONTAINER: '',
        TABLE: 'table xtable-condensed table-striped table-bordered table-hover',
        // TABLE_CONTAINER: 'table-container',
        // HEADER_FIXED_CONTAINER: 'hidden',
        // HEADER: 'hidden',
        HEADER_HIDDEN: 'header-hidden',
        ROW: 'row-override',
        CELL: 'text-left',
        // COLUMN: 'column',
        // PAGERTOOLBAR: 'text-right bootstrap-description',
        // BUTTONS: {
        //   PAGER: 'btn pull-left negative-margin'
        // },
        ERROR_HANDLER: {
          CONTAINER: 'hidden'
        }
      },
      CSS_PREFIX: ''
    })
  }

  gridColumns() {
    return [
      {
        name: 'id',
        dataIndex: 'id',
        sortable: true,
        editable: false,
        width: '15%'
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
        name: 'IP',
        dataIndex: 'ip',
        sortable: true,
        editable: false,
        width: '25%'
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
      // EDITOR: {
      //   type: 'inline',
      //   enabled: true,
      //   focusOnEdit: true
      // },
      SELECTION_MODEL: {
        // editEvent: 'doubleclick',
        activeCls: 'info',
        allowDeselect: false
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
