import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar
} from 'react-bootstrap';

class MachineForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      machine: props.machine,
      isSaving: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      machine: nextProps.machine,
      isSaving: false
    })
  }

  onChange(e, field) {
    const { machine } = this.state
    const {value} = e.target
    this.setState({
      machine: {
        ...machine,
        [field]: value
      }
    })
    e.preventDefault()
    // this.props.onChange(value)
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({isSaving: true})
    this.props.onSaveMachine(this.state.machine)
  }

  isReadOnly() {
    return this.props.readOnly
  }

  isUpdateDisabled() {
    const propsMachine = this.props.machine
    const stateMachine = this.state.machine
    return (
      this.isSaving() || (
        propsMachine.name === stateMachine.name &&
        propsMachine.owner === stateMachine.owner &&
        propsMachine.description === stateMachine.description
      )
    )
  }

  isSaving() {
    return this.state.isSaving === true
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <ControlLabel>Machine ID</ControlLabel>
          <FormControl.Static>{this.state.machine.id}</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>IP Address</ControlLabel>
          <FormControl.Static>{this.state.machine.ip}</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text"
                       value={this.state.machine.name}
                       placeholder='Machine Name'
                       readOnly={this.isReadOnly()}
                       onChange={(e) => this.onChange(e, 'name')} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Owner</ControlLabel>
          <FormControl type="text"
                       value={this.state.machine.owner}
                       placeholder='Owner'
                       readOnly={this.isReadOnly()}
                       onChange={(e) => this.onChange(e, 'owner')} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea"
                       value={this.state.machine.description || ''}
                       placeholder='Description'
                       rows='8'
                       readOnly={this.isReadOnly()}
                       onChange={(e) => this.onChange(e, 'description')} />
        </FormGroup>
        {!this.isReadOnly() ?
          <ButtonToolbar>
            <Button bsStyle='primary'
                    disabled={this.isUpdateDisabled()}
                    type='submit'>
                      {this.isSaving() ? 'Updating...' : 'Update'}
            </Button>
          </ButtonToolbar>
          :
          null}
      </form>
    )
  }
}

export { MachineForm }
