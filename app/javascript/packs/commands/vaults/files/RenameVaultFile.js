import LocalVaultRepo from '../../../repos/LocalVaultRepo'

export default function RenameVaultFile ({newName, oldName}) {
  return new Promise((resolve, reject) => {
    if (newName.length <= 3) {
      reject('File name is to small')
    } else if (LocalVaultRepo.exists({ name: newName })) {
      reject(`There is already file with name: ${newName}`)
    } else {
      LocalVaultRepo.update((currentState) => {
        let files = currentState.files.map((file) => {
          if (file.name === oldName) {
            return {...file, name: newName}
          } else {
            return file
          }
        })

        return {...currentState, files, changed: true}
      })
      resolve(newName)
    }
  })
}
