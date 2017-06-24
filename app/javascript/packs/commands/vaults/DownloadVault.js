import axios from 'axios'
import { Promise } from 'es6-promise'

export default function DownloadVault ({ name }) {
  return new Promise(function (resolve, reject) {
    return axios.get(`/vaults/${name}?format=json`).then(({ data }) => {
      resolve(data)
    }).catch((error) => {
      console.log(error)
      if (error.response) {
        let { errors } = error.response.data
        reject(errors)
      } else {
        reject({ base: [error.message] })
      }
    })
  })
}
