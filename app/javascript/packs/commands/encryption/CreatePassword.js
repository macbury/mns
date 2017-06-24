import work from 'webworkify-webpack'
import { Promise } from 'es6-promise'

export default function CreatePassword() {
  return new Promise(function(resolve, reject) {
    let worker = work(require.resolve('./CreatePasswordWorker.js'));

    worker.addEventListener('message', event => {
      resolve(event.data)
    })
  })
}
