import React, { Component } from 'react'
import VaultProvider from '../hoc/VaultProvider'
import ActionButtons from './toolbar/ActionButtons'
import MDSpinner from 'react-md-spinner'

class VaultToolbar extends Component {

  isLoading () {
    return this.props.encryptedFiles == null && this.props.files == null
  }

  getIcon () {
    if (this.isLoading()) {
      return <MDSpinner size="16" className="spinner" />
    } else {
      return <span className="glyphicon glyphicon-lock" />
    }
  }

  render () {
    let { name } = this.props

    return (
      <div className="nav navbar-left">
        <a href="/" className="navbar-brand">
          {this.getIcon()}
          {name}
        </a>
        <ActionButtons {...this.props} />
      </div>
    )
  }
}

export default VaultProvider(VaultToolbar, ['name', 'changed', 'files', 'encryptedFiles'])
