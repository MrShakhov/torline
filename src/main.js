import Vue from 'vue'
import App from './App.vue'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faChevronRight,
    faChevronLeft,
    faSpinner,
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faChevronRight,
    faChevronLeft,
    faStar,
    faSpinner,
    faSearch
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
