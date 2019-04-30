import Vue from 'vue';
import App from './App';
import router from './router';

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

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
