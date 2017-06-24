module ApplicationHelper

  def react_component(klass, props = {}, js = nil)
    content_for(:javascript) { javascript_pack_tag(js) } if js
    content_tag 'div', '', data: { 'react-class' => klass, 'react-props' => props }
  end
end
