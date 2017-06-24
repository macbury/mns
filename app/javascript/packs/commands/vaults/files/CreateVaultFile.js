import LocalVaultRepo from '../../../repos/LocalVaultRepo'
import { Promise } from 'es6-promise'

function findEmptyName() {
  let name
  let i = 0
  while(name == null || LocalVaultRepo.exists({ name })) {
    i+=1
    name = `Empty file ${i}`
  }

  return name
}

export default function CreateVaultFile(name) {
  if (name == null)
    name = findEmptyName()
  return new Promise(function(resolve, reject) {
    if (LocalVaultRepo.exists({ name })) {
      reject()
    } else {
      LocalVaultRepo.update((currentState) => {
        let files = currentState.files.concat({ name, content: '' })
        return {...currentState, files}
      });
      resolve(name)
    }
  })
}
