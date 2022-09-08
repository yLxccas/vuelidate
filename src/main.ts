import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tooltip from 'primevue/tooltip';

import '/node_modules/primeflex/primeflex.css'

createApp(App)
  .use(store)
  .use(PrimeVue)
  .component('InputText', InputText)
  .component('Button', Button)
  .component('Card', Card)
  .directive('tooltip', Tooltip)
  .mount('#app')

