import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './firebase/config'

// Import Tailwind CSS
import './assets/tailwind.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')