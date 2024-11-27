import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupMonaco } from './monaco/setup';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toastOptions = {
  position: 'top-right',
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
};

setupMonaco();
const app = createApp(App);
app.use(Toast, toastOptions);
app.mount('#app');