import React, { Component } from 'react'

import VaultProvider from '../hoc/VaultProvider'
import DecryptVaultForm from './manager/DecryptVaultForm'
import FilesEditor from './manager/FilesEditor'
import { FetchVault } from '../../commands/vaults'

class ManageVault extends Component {
  componentWillMount () {
    let { name } = this.props
    FetchVault({ name })
  }

  render () {
    let { name, encryptedFiles, files, errors } = this.props
    if (encryptedFiles) {
      return (<DecryptVaultForm name={name} errors={errors} />)
    } else if (files) {
      return (<FilesEditor files={files} errors={errors} />)
    } else {
      return null
    }
  }
}

export default VaultProvider(ManageVault, ['encryptedFiles', 'files', 'name', 'errors'])
