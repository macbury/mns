import Emitter from 'emmett'
import _ from 'underscore'

class LocalVaultRepo extends Emitter {
  data = null

  set(vaultInitialData) {
    this.data = vaultInitialData
    this.emit('change', this.data)
  }

  cleanup() {
    this.set({})
  }

  get(key) {
    if (key != null) {
      return this.data[key]
    } else {
      return this.data
    }
  }

  update(updateStateFunc) {
    return this.set(updateStateFunc(this.data))
  }

  exists(obj) {
    return _.findWhere(this.data.files, obj);
  }
}

const repo = new LocalVaultRepo()
export default repo;
