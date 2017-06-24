import DownloadVault from './DownloadVault'
import LocalVaultRepo from '../../repos/LocalVaultRepo'

export default function FetchVault ({ name }) {
  return DownloadVault({ name }).then(function ({ files }) {
    LocalVaultRepo.update((currentState) => { return { name, encryptedFiles: files } })
  })
}
