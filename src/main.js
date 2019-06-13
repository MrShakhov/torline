import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
    faSpinner,
    faSearch,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(
    faChevronRight,
    faChevronLeft,
    faSpinner,
    faSearch,
    faStar
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
// End Font Awesome

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
