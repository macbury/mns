import React, { Component } from 'react'
import _ from 'underscore'

const GlobalErrorText = ({ errors }) => {
  if (_.isNull(errors) || _.isUndefined(errors)) {
    return <span />
  } else {
    return <div className="alert alert-danger">{ errors.join(', ') }</div>
  }
}

export default GlobalErrorText
