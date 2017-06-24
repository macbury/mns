import React, { Component } from 'react'
import EditorTab from './EditorTab'
import FileEditor from './FileEditor'
import AddFileButton from './AddFileButton'
import EditorErrors from './EditorErrors'
import DetectMode from './DetectMode'

import { UpdateVaultFileContent, CreateVaultFile, RemoveVaultFile, RenameVaultFile } from '../../../commands/vaults'

export default class FilesEditor extends Component {

  constructor () {
    super()
    this.state = { selectedFileName: '' }
  }

  componentWillMount () {
    this.setState({
      selectedFileName: this.props.files[0].name
    })
  }

  handleSelectFile (fileName) {
    this.setState({ selectedFileName: fileName })
  }

  handleRemoveFile (e, name) {
    e.stopPropagation()
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      RemoveVaultFile({ name })
    }
  }

  handleAddFile () {
    CreateVaultFile().then((name) => {
      this.setState({ selectedFileName: name })
    })
  }

  handleFileNameChange (oldName, newName) {
    RenameVaultFile({ newName, oldName }).then(() => {
      this.setState({ selectedFileName: newName })
    }).catch((error) => alert(error))
  }

  getTabs () {
    let { files } = this.props
    return files.map(({ name }) => {
      return <EditorTab
        key={name}
        active={this.isSelected(name)}
        name={name}
        onChangeName={(newName) => this.handleFileNameChange(name, newName)}
        onRemoveClick={(e) => this.handleRemoveFile(e, name)}
        onClick={() => this.handleSelectFile(name)} />
    })
  }

  getEditors () {
    let { files } = this.props
    return files.map(({ name, content }) => {
      return <FileEditor
        key={name}
        content={content}
        mode={DetectMode(name)}
        onChange={(newContent) => UpdateVaultFileContent({ content: newContent, name })}
        visible={this.isSelected(name)} />
    })
  }

  isSelected (fileName) {
    let { selectedFileName } = this.state
    return selectedFileName === fileName
  }

  render () {
    return (
      <div className="vault-manager">
        <EditorErrors errors={this.props.errors} />
        <div className="tabs">
          { this.getTabs() }
          <AddFileButton onClick={this.handleAddFile.bind(this)} />
        </div>
        { this.getEditors() }
      </div>
    )
  }
}

FilesEditor.defaultProps = {
  files: [],
  errors: null
}
