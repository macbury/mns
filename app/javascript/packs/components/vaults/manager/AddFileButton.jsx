import React, { Component } from 'react'

const AddFileButton = ({ onClick }) => {
  return <div className="add-button" onClick={onClick}><span className="glyphicon glyphicon-plus"></span></div>
}

export default AddFileButton
