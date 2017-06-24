import React, { Component } from 'react';
import _ from 'underscore'
export default class TextArea extends Component {

  render() {
    let { type, placeholder, label, inputClass, value, disabled } = this.props
    return (
      <div className="form-group">
        <label htmlFor={ this.inputName }>{ label }</label>
        <textarea className="form-control" value={value} disabled={ disabled } />
      </div>
    )
  }

  get inputName() {
    if (_.isNull(this.props.name)) {
      return _.uniqueId('TextArea_');
    } else {
      return this.props.name;
    }
  }
}

TextArea.defaultProps = {
  type: 'text',
  name: null,
  placeholder: '',
  label: 'Label',
  inputClass: '',
  value: '',
  disabled: false
}
