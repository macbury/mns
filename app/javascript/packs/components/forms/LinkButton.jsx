import React, { Component } from 'react';

const LinkButton = ({ children, type, href, disabled }) => {
  let cssClassName = `btn btn-lg btn-block btn-${type}`
  let targetHref = disabled ? '#' : href
  return <a className={cssClassName} href={targetHref} disabled={disabled}>{ children }</a>
}

LinkButton.defaultProps = {
  type: 'default',
  href: '/',
  disabled: false
}

export default LinkButton
