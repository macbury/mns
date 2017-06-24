import React, { Component } from 'react'
import _ from 'underscore'

const StatusText = ({ children, visible }) => {
  if (visible) {
    return <div className="alert alert-info">{ children }</div>
  } else {
    return <span />
  }
}

export default StatusText
