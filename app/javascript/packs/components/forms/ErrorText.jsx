import React, { Component } from 'react'
import _ from 'underscore'
const ErrorText = ({ errors }) => {
  if (_.isNull(errors) || _.isUndefined(errors)) {
    return <span />
  } else {
    return <span className="help-block">{ errors.join(', ') }</span>
  }
}

export default ErrorText
