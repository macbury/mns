import LocalVaultRepo from '../../../repos/LocalVaultRepo'
export default function UpdateVaultFileContent({ name, content }) {
  LocalVaultRepo.update((currentState) => {
    let files = currentState.files.map((file) => {
      if (file.name == name) {
        return { name, content }
      } else {
        return file
      }
    })

    return {...currentState, files, changed: true }
  });
}
