import React, { Component } from 'react'
import LocalVaultRepo from '../../repos/LocalVaultRepo'

const VaultProvider = (ComposedComponent, fields) => class extends Component {
  constructor () {
    super()

    this.state = this.getOnlyFieldsForState()

    this.onRepoChangeCallback = this.onRepoChange.bind(this)
  }

  getOnlyFieldsForState() {
    let data = LocalVaultRepo.get()
    if (data == null) {
      data = {}
    }
    let state = {}
    fields.forEach((field) => {
      state[field] = data[field]
    })
    return state
  }

  onRepoChange ({ data }) {
    this.setState(this.getOnlyFieldsForState())
  }

  componentDidMount () {
    LocalVaultRepo.on('change', this.onRepoChangeCallback)
  }

  componentWillUnmount () {
    LocalVaultRepo.off('change', this.onRepoChangeCallback)
  }

  render () {
    return <ComposedComponent {...this.state} {...this.props} />
  }
}

export default VaultProvider
