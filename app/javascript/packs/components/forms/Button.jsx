import React, { Component } from 'react';

const Button = ({ children, type, disabled }) => {
  let cssClassName = `btn btn-lg btn-block btn-${type}`
  return <button className={cssClassName} disabled={disabled}>{ children }</button>
}

Button.defaultProps = {
  type: 'primary',
  disabled: false
}

export default Button
