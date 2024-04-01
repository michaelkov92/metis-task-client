import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(PrimeVue);
app.directive('tooltip', Tooltip);
app.mount('#app');
