import { UndoManager } from 'brace'
import React, { Component } from 'react'
import _ from 'underscore'
import AceEditor from 'react-ace'

export default class FileEditor extends Component {

  handleEditorContentChange(content) {
    this.props.onChange(content)
  }

  haveFile() {
    return this.props.content != null;
  }

  render() {
    return this.getEditor()
  }

  componentWillReceiveProps({ visible }) {
    if (this.props.visible != visible && visible) {
      this.refs.aceEditor.editor.focus()
    }
  }

  getEditor() {
    let { mode, content, visible } = this.props
    let style = {}
    if (!visible) {
      style['display'] = 'none'
    }
    return (
      <AceEditor
        mode={ mode }
        style={ style }
        ref="aceEditor"
        theme="twilight"
        onChange={ this.handleEditorContentChange.bind(this) }
        width=""
        height=""
        defaultValue={ content }
        value={ content }
        fontSize={18}
        tabSize={2}
        useSoftTabs={true}
      />
    )
  }
}

FileEditor.defaultProps = {
  mode: null,
  content: null,
  visible: null,
  onChange: function() {}
}
