import React from 'react'
import _ from 'underscore'
const EditorErrors = ({ errors }) => {
  if (errors) {
    return <div className="editor-errors">{ _.values(errors).join(', ') }</div>
  } else {
    return null
  }
}

export default EditorErrors
