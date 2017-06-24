import React from 'react'
import ReactDOM from 'react-dom'

const CLASS_NAME_ATTR = 'data-react-class'
const PROPS_ATTR = 'data-react-props'

function mount(node) {
  let className = node.getAttribute(CLASS_NAME_ATTR);
  let constructor = window[className];
  let propsJson = node.getAttribute(PROPS_ATTR);
  let props = propsJson && JSON.parse(propsJson);

  if (!constructor) {
    var message = "Cannot find component: '" + className + "'"
    if (console && console.log) {
      console.log("%c[react] %c" + message + " for element", "font-weight: bold", "", node)
    }
    throw new Error(message + ". Make sure your component is available to render.")
  } else {
    ReactDOM.render(React.createElement(constructor, props), node);
  }
}

function mountAll() {
  const nodes = document.querySelectorAll(`[${CLASS_NAME_ATTR}]`)
  for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i];
    mount(node);
  }
}


document.addEventListener("DOMContentLoaded", mountAll)
