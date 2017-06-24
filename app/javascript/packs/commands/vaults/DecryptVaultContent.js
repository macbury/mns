import { Decrypt } from '../encryption'
import LocalVaultRepo from '../../repos/LocalVaultRepo'

export default function DecryptVaultContent ({ password }) {
  let { encryptedFiles, name } = LocalVaultRepo.get()
  LocalVaultRepo.set({ name })

  return Decrypt({ password, data: encryptedFiles }).then((decryptedFiles) => {
    LocalVaultRepo.update((currentState) => {
      return { name, password, files: decryptedFiles, changed: false }
    })
  }).catch(() => {
    LocalVaultRepo.update((currentState) => { return { encryptedFiles, name, errors: ['Invalid key'] } })
  })
}
