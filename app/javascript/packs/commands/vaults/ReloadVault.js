import FetchVault from './FetchVault'
import DecryptVaultContent from './DecryptVaultContent'
import LocalVaultRepo from '../../repos/LocalVaultRepo'

export default function ReloadVault() {
  let { name, password, files } = LocalVaultRepo.get()
  LocalVaultRepo.cleanup()
  return FetchVault({ name })
    .then(() => { DecryptVaultContent({ password }) })
    .catch((errors) => { LocalVaultRepo.set({ name, password, files, errors }) })
}
