import { random, util } from 'node-forge'
import { keySize } from '../../config/keyTypes.json'

export default function(worker) {
  let key = random.getBytesSync(keySize)
  let password = util.encode64(key)
  worker.postMessage({ password })
}
