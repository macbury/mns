import React, { Component } from 'react'
import { SelectFile, GlobalErrorText, StatusText } from '../../forms'
import { DecryptVaultContent } from '../../../commands/vaults'

export default class DecryptVaultForm extends Component {

  handlePotentialRsaKey (password) {
    DecryptVaultContent({ password })
  }

  render () {
    let { errors } = this.props
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <GlobalErrorText errors={errors} />
          <SelectFile onTextFileSelected={this.handlePotentialRsaKey.bind(this)}>
            <span className="glyphicon glyphicon-download-alt" />
            <span className="about">
              Select password key to decrypt this vault
              <br />
              (click or drop file here)
            </span>
          </SelectFile>
        </div>
      </div>
    )
  }
}
