export default {
    props: {
        tmdbId: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            title: '',
            originalTitle: '',
            backdropFileName: '',
            posterFileName: '',
            releaseDate: '',
            runtime: 0,
            rating: 0,
            countries: [],
            genres: [],
            cast: [],
            crew: [],
            videos: [],
            overview: '',
            isRecommendations: false,
            isSimilar: false
        }
    },

    computed: {
        shortProperties() {
            return `${this.year} / ${this.duration} / tMDB ${this.rating} / ${this.countriesStr}`;
        },
        castStr() {
            const castNames = [];

            for (let i = 0; i < 10 && i < this.cast.length; i++) {
                castNames.push(this.cast[i].name);
            }

            return castNames.join(', ');
        },
        posterUrl() {
            return (this.posterFileName === null) ?
                '/img/poster.svg' :
                `https://image.tmdb.org/t/p/w500${this.posterFileName}`;
        },
        year() {
            return this.releaseDate.slice(0, 4);
        },
        duration() {
            const hours = Math.floor(this.runtime / 60);
            const minutes = this.runtime % 60;

            return `${hours} ч ${minutes} мин`;
        },
        genresStr() {
            const genreTitles = this.genres.map( (item) => item.name );

            return genreTitles.join(', ');
        },
        countriesStr() {
            const countriesTitles = this.countries.map( (item) => item.name );

            return countriesTitles.join(', ');
        },
        director() {
            for (let i = 0; i < this.crew.length; i++) {
                if (this.crew[i].job === 'Director') return this.crew[i];
            }

            return {
                name: 'информация отсутствует'
            };
        }
    },

    methods: {
        loadContent() {
            // Loading movie info from TMDB
            let url = `https://api.themoviedb.org/3/movie/${this.tmdbId}?api_key=0b771070b72e43da48055b81f73de132&language=ru&append_to_response=videos%2Ccredits%2Crecommendations%2Csimilar`;
            fetch(url)
                .then( (response) => response.json() )
                .then( (response) => {
                    this.originalTitle = response.original_title;
                    this.overview = response.overview;
                    this.posterFileName = response.poster_path;
                    this.backdropFileName = response.backdrop_path;
                    this.releaseDate = response.release_date;
                    this.runtime = response.runtime;
                    this.title = response.title;
                    this.rating = response.vote_average;
                    this.videos = response.videos.results;
                    this.genres = response.genres;
                    this.countries = response.production_countries;
                    this.crew = response.credits.crew;
                    this.cast = response.credits.cast.map( item => {

                        // Renaming key "profile_path" by "photoFileName"
                        item.photoFileName = item.profile_path;
                        delete item.profile_path;

                        return item;
                    } );

                    // Checking for additional materials
                    if (response.recommendations.total_results > 0) this.isRecommendations = true;
                    if (response.similar.total_results > 0) this.isSimilar = true;
                } );
        }
    }
}