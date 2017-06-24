import React, { Component } from 'react'
import { ReloadVault, SaveVault } from '../../../commands/vaults'

export default class ActionButtons extends Component {
  render () {
    let { changed, files } = this.props
    if (files == null) {
      return null
    } else {
      return (
        <div className="navbar-form navbar-left">
          <div className="btn-group">
            <button className="btn btn-default" disabled={!changed} onClick={SaveVault}>Save</button>
            <button className="btn btn-default" onClick={ReloadVault}>Reload</button>
            <button className="btn btn-default">Deploy</button>
          </div>
        </div>
      )
    }
  }
}
