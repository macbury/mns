import brace from 'brace'
import 'brace/mode/json'
import 'brace/mode/yaml'
import 'brace/mode/ini'
import 'brace/mode/ruby'
import 'brace/mode/javascript'
import 'brace/mode/xml'
import 'brace/mode/markdown'
import 'brace/mode/sh'
import 'brace/theme/twilight'

const MATCHER = {
  '.js': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.ini': 'ini',
  '.rb': 'ruby',
  '.js': 'javascript',
  '.xml': 'xml',
  '.sh': 'sh'
}

const DetectMode = (filename) => {
  for (let extension in MATCHER) {
    if (filename.match(extension)) {
      return MATCHER[extension]
    }
  }
  return 'markdown'
}

export default DetectMode
