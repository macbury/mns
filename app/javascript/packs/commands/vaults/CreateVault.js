import defaultVaultDoc from '../../config/defaultVault.json'
import { Encrypt } from '../encryption'
import axios from 'axios'
import { Promise } from 'es6-promise'

const CREATE_VAULT_ENDPOINT = '/vaults.json'

function sendToServer ({ files, name }) {
  return new Promise (function(resolve, reject) {
    return axios.post(CREATE_VAULT_ENDPOINT, { vault: { name, files } }).then((response) => {
      resolve(response.data.redirect_to)
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

export default function CreateVault ({ password, name }) {
  return Encrypt({ password, data: defaultVaultDoc }).then((files) => sendToServer({ name, files }))
}
