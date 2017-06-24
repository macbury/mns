import LocalVaultRepo from '../../../repos/LocalVaultRepo'
import _ from 'underscore'

export default function RemoveVaultFile ({ name }) {
  LocalVaultRepo.update((currentState) => {
    let files = _.reject(currentState.files, (file) => (file.name === name))
    return {...currentState, files, changed: true }
  })
}
