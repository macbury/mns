import React, { Component } from 'react'

export default class EditorTab extends Component {

  constructor() {
    super()
    this.state = { editing: false, editorValue: '' }
  }

  componentWillReceiveProps({ active }) {
    let { editing } = this.state
    if (!active && editing) {
      this.setState({ editing: false })
    }
  }

  handleSwitchToEditor(e) {
    e.stopPropagation()
    this.setState({ editing: true, editorValue: this.props.name })
  }

  handleAcceptingNewName(e) {
    e.stopPropagation()
    let { onChangeName } = this.props
    let { editorValue } = this.state

    onChangeName(editorValue)
    this.setState({ editing: false })
  }

  getActionButton () {
    let { active, onRemoveClick, onChangeName } = this.props
    let { editing } = this.state

    if (editing) {
      return (<span className="remove glyphicon glyphicon-ok" onClick={::this.handleAcceptingNewName} />)
    } else if (active) {
      return (<span className="remove glyphicon glyphicon-edit" onClick={::this.handleSwitchToEditor} />)
    } else {
      return (<span className="remove glyphicon glyphicon-remove" onClick={onRemoveClick} />)
    }
  }

  getTextField() {
    let { editorValue } = this.state
    return <input value={editorValue} type="text" onChange={::this.handleNameChange} />
  }

  handleNameChange(e) {
    this.setState({ editorValue: e.target.value })
  }

  render () {
    let { name, active, onClick } = this.props
    let { editing } = this.state
    return (
      <div className={active ? 'active tab' : 'tab'} onClick={onClick}>
        {this.getActionButton()}
        <span className="icon glyphicon glyphicon-file" />
        {editing ? this.getTextField() : name}
      </div>
    )
  }
}
