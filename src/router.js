import Vue from 'vue';
import Router from 'vue-router';
import MainPage from "./views/MainPage";
import MoviePage from "./views/MoviePage";
import SearchResultsPage from "./views/SearchResultsPage";

Vue.use(Router);

export default new Router({
    mode: 'history',

    routes: [
        { path: '/', component: MainPage },
        { path: '/movie/:tmdbId', component: MoviePage, props: (route) => ({ tmdbId: +route.params.tmdbId }) },
        { path: '/search/:searchQuery', component: SearchResultsPage, props: true }
    ],

    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0};
    }
});