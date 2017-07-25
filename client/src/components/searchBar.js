import React, { Component } from 'react';

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
      <input type="text"
             className="SearchBar"
             placeholder="Start typing..."
             onChange={(e) => this.onChange(e.target.value)} />
    )
  }
}

export { SearchBar }
