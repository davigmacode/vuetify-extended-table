import Vue from 'vue'
import App from './App.vue'
import {
  Vuetify,
  VApp,
  VGrid,
  VCard,
  VBtn,
  VIcon,
  VChip,
  VForm,
  VSelect,
  VTextField,
  VDialog,
  VCheckbox,
  VDataTable,
  VDivider,
  VToolbar,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

import VxTable from '../src'

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VCard,
    VBtn,
    VIcon,
    VChip,
    VForm,
    VSelect,
    VTextField,
    VDialog,
    VCheckbox,
    VDataTable,
    VDivider,
    VToolbar,
    transitions
  }
})
Vue.use(VxTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
