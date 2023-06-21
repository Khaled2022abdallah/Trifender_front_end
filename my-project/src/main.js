// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');

