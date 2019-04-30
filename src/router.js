import Vue from 'vue';
import Router from 'vue-router';
import MainPage from "./components/MainPage";
import MoviePage from "./components/MoviePage";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: MainPage },
        { path: '/movie/:tmdbId', component: MoviePage, props: (route) => ({tmdbId: +route.params.tmdbId}) }
    ]
});
