import Vue from 'vue'
import App from './App.vue'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faChevronRight,
    faChevronLeft,
    faSpinner,
    faSearch,
    faStar
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
    render: h => h(App),
}).$mount('#app');
