import work from 'webworkify-webpack'
import { Promise } from 'es6-promise'

export default function Decrypt ({ password, data }) {
  return new Promise(function (resolve, reject) {
    let worker = work(require.resolve('./DecryptWorker.js'))

    worker.addEventListener('message', event => {
      console.log(event.data)
      let { decryptedFiles, errors } = event.data
      if (decryptedFiles) {
        resolve(decryptedFiles)
      } else {
        reject(errors)
      }
    })

    worker.postMessage({ password, data })
  })
}
