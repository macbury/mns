import FileSaver from 'file-saver'

export default function SavePrivateKeyLocaly({ password, name }) {
  let fileBlop = new Blob([password], {type: "text/plain;charset=utf-8"})
  FileSaver.saveAs(
    fileBlop,
    `mns.${name}.key`,
    true // because if false then it fuck up the entire rsa key by adding http://www.fileformat.info/info/unicode/char/feff/index.htm
  )
}
