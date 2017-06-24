import React, { Component } from 'react'
import _ from 'underscore'
import ErrorText from './ErrorText'

export default class TextField extends Component {

  render() {
    let { type, placeholder, label, inputClass, value, onChange, errors,  disabled } = this.props
    return (
      <div className={this.formGroupClass}>
        <label htmlFor={ this.inputName }>{ label }</label>
        <input disabled={ disabled } onChange={ onChange } value={value} type={ type } className={ 'form-control ' + inputClass } name={ this.inputName } id={ this.inputName } placeholder={ placeholder } />
        <ErrorText errors={errors} />
      </div>
    )
  }

  get formGroupClass() {
    let { errors } = this.props
    if (_.isNull(errors) || _.isUndefined(errors)) {
      return 'form-group'
    } else {
      return 'form-group has-error'
    }
  }

  get inputName() {
    if (_.isNull(this.props.name)) {
      return _.uniqueId('TextField_');
    } else {
      return this.props.name;
    }
  }
}

TextField.defaultProps = {
  type: 'text',
  name: null,
  placeholder: '',
  label: 'Label',
  inputClass: '',
  value: '',
  errors: null,
  disabled: false,
  onChange: null
}
