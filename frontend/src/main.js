import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/fr'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

window.EventBus = new Vue

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
