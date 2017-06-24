import { keySize, ivSize, cipherName } from '../../config/keyTypes.json'
import { random, md, pbe, util, cipher } from 'node-forge'
import { pack } from 'tar-stream'
import { PassThrough } from 'stream'
import { Promise } from 'es6-promise'

function compress ({ files }) {
  return new Promise((resolve, reject) => {
    let tarPack = pack()
    files.forEach(({name, content}) => {
      tarPack.entry({ name }, content)
    })

    tarPack.finalize()

    var output = new PassThrough()
    tarPack.pipe(output)

    let bufferAccumulator = []
    output.on('data', (data) => bufferAccumulator.push(data))
    output.on('end', () => {
      resolve(Buffer.concat(bufferAccumulator))
    })
  })
}

function encryptFiles ({ files, password }) {
  return new Promise((resolve, reject) => {
    let salt = random.getBytesSync(8)
    let hashFunction = md.sha512.create()
    let derivedBytes = pbe.opensslDeriveBytes(password, salt, keySize + ivSize, hashFunction)
    let buffer = util.createBuffer(derivedBytes)
    let key = buffer.getBytes(keySize)
    let iv = buffer.getBytes(ivSize)

    var aesCipher = cipher.createCipher(cipherName, key)
    aesCipher.start({ iv })
    aesCipher.update(util.createBuffer(files, 'binary'))
    aesCipher.finish()

    var output = util.createBuffer()

    if (salt !== null) {
      output.putBytes('Salted__')
      output.putBytes(salt)
    }
    output.putBuffer(aesCipher.output)

    let encodedEncryptedData = util.encode64(output.getBytes())
    resolve(encodedEncryptedData)
  })
}

export default function Encrypt ({ password, data }) {
  return compress({ files: data }).then((compressedFiles) => encryptFiles({ files: compressedFiles, password }))
}
