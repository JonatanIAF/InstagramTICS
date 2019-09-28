import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire'
Vue.config.productionTip = false;
Vue.use(firestorePlugin)
const messaging = firebase.messaging();


let app = '';

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        /* eslint-disable no-new */
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    }
});

messaging.usePublicVapidKey("BFXQ2yCrfLOJIhkcyt47r109L3iV4i1ffLLN7IzsGMdwvAg7gWJvGq9sDzpgburTXXiRMDXUAJrwdmpTI8BFkMI");

messaging.requestPermission().then(() => {
    console.log('Notificacion permission granted');

    messaging.getToken().then((token) => {
        console.log(token);
    });
}).catch((err) => {
    console.log('Unable to get permission to notify', err);
});
