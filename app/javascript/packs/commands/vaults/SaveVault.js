import { Encrypt } from '../encryption'
import axios from 'axios'
import { Promise } from 'es6-promise'
import LocalVaultRepo from '../../repos/LocalVaultRepo'

function sendToServer ({ name, encryptedFiles }) {
  return new Promise(function (resolve, reject) {
    return axios.put(`/vaults/${name}`, { vault: { files: encryptedFiles }, format: 'json' }).then((response) => {
      resolve()
    }).catch((error) => {
      if (error.response) {
        let { errors } = error.response.data
        reject(errors)
      } else {
        reject({ base: [error.message] })
      }
    })
  })
}

export default function SaveVault () {
  let { password, name, files } = LocalVaultRepo.get()
  LocalVaultRepo.cleanup()
  return Encrypt({ password, data: files })
    .then((encryptedFiles) => { return sendToServer({ name, encryptedFiles }) })
    .then(() => {
      LocalVaultRepo.update((currentState) => { return { password, name, files, changed: false } })
    }).catch((errors) => {
      LocalVaultRepo.update((currentState) => { return { errors, password, name, files, changed: true } })
    })
}
