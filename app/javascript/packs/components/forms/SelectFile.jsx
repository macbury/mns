import React, { Component } from 'react';

export default class SelectFile extends Component {

  render() {
    let { label, children } = this.props
    return (
      <div className="select-file">
        { children }
        <input type="file" onChange={this.handleFile.bind(this)} />
      </div>
    )
  }

  handleFile(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    let fileToLoad = evt.target.files[0]
    if (fileToLoad) {
      let reader = new FileReader()
      reader.onload = () => this.props.onTextFileSelected(reader.result)
      reader.readAsText(fileToLoad)
    }
  }
}

SelectFile.defaultProps = {
  label: '',
  onTextFileSelected: function(content) {}
}
