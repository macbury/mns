import { keySize, ivSize, cipherName } from '../../config/keyTypes.json'
import { md, pbe, util, cipher } from 'node-forge'

import { extract } from 'tar-stream'
import { Duplex } from 'stream'
import { Promise } from 'es6-promise'

function decryptData ({ password, data }) {
  return new Promise(function (resolve, reject) {
    try {
      let hashFunction = md.sha512.create()
      let input = util.createBuffer(util.decode64(data), 'binary')
      input.getBytes('Salted__'.length)
      let salt = input.getBytes(8)

      let derivedBytes = pbe.opensslDeriveBytes(password, salt, keySize + ivSize, hashFunction)
      let buffer = util.createBuffer(derivedBytes)

      let key = buffer.getBytes(keySize)
      let iv = buffer.getBytes(ivSize)

      let decipher = cipher.createDecipher(cipherName, key)
      decipher.start({ iv })
      decipher.update(input)
      if (!decipher.finish()) {
        reject({ base: ['Invalid key'] })
      }

      resolve(decipher.output.getBytes())
    } catch (e) {
      console.error(e)
      reject({ base: ['Invalid key'] })
    }
  })
}

function decompressData ({ data }) {
  return new Promise(function (resolve, reject) {
    let tarExtract = extract()
    let textDecoder = new TextDecoder('utf-8')
    let files = []
    tarExtract.on('entry', function (header, stream, next) {
      let content = []

      stream.on('data', (fileContent) => {
        content += textDecoder.decode(fileContent)
      })

      stream.on('end', function () {
        files.push({ name: header['name'], content })
        next()
      })

      stream.resume()
    })

    tarExtract.on('finish', function () {
      resolve(files)
    })

    tarExtract.on('error', function(error) {
      console.error('Decompressing...', error)
      reject({ base: ['Error while decompresing tar file'] })
    })

    let decryptedTarStream = new Duplex()
    decryptedTarStream.push(data)
    decryptedTarStream.push(null)
    decryptedTarStream.pipe(tarExtract)
  })
}

export default function (worker) {
  worker.addEventListener('message', (event) => {
    let { password, data } = event.data
    decryptData({ password, data })
      .then((data) => decompressData({ data }))
      .then((decryptedFiles) => worker.postMessage({ decryptedFiles }))
      .catch((errors) => worker.postMessage({ errors }))
  })
}
