import VxTable from './components/VxTable.vue'
import VxTableFilter from './components/VxTableFilter.vue'
import VxTableToolbar from './components/VxTableToolbar.vue'

class Plugin {
  install (Vue) {
    Vue.component(VxTable.name, VxTable)
    Vue.component(VxTableFilter.name, VxTableFilter)
    Vue.component(VxTableToolbar.name, VxTableToolbar)
  }
}

export {
  VxTable,
  VxTableFilter,
  VxTableToolbar
}

export default new Plugin()