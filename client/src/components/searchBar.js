import React, { Component } from 'react';
import {
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';

import './SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>Search for:</InputGroup.Addon>
            <FormControl type="text" onChange={(e) => this.onChange(e.target.value)} />
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

export { SearchBar }
