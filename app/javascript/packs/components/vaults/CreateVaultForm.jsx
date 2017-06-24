import React, { Component } from 'react'
import MDSpinner from 'react-md-spinner'
import { TextField, Button, LinkButton, TextArea, GlobalErrorText, StatusText } from '../forms'
import { CreateVault, SavePrivateKeyLocaly } from '../../commands/vaults'
import { CreatePassword } from '../../commands/encryption'

export default class CreateVaultForm extends Component {

  constructor () {
    super()
    this.state = {
      password: null,
      name: '',
      errors: {},
      loading: true
    }
  }

  componentWillMount () {
    CreatePassword().then(({password}) => {
      this.setState({ password, loading: false })
    })
  }

  render () {
    let { errors, name, password, loading } = this.state
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <StatusText visible={password == null}>
          <MDSpinner size="16" className="spinner" />
          Generating password key. This can take a while. Please wait...
        </StatusText>
        <GlobalErrorText errors={errors.base} />
        <TextField
          disabled={loading}
          label="Name:"
          value={name}
          errors={errors.name}
          placeholder="for example project-name.env"
          inputClass="input-lg"
          onChange={this.handleNameChange.bind(this)}/>
        <Button disabled={ loading }>Create Vault</Button>
        <LinkButton href="/vaults" disabled={ loading }>Cancel</LinkButton>
      </form>
    )
  }

  handleNameChange (event) {
    this.setState({name: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ errors: {}, loading: true })
    let { password, name } = this.state
    CreateVault({ password, name }).then((redirectUrl) => {
      SavePrivateKeyLocaly({ password, name })
      window.location.href = redirectUrl
    }).catch((errors) => {
      console.log(errors)
      this.setState({ errors, loading: false })
    })
  }
}
