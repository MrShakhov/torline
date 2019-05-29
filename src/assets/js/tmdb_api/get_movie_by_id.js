import { API_KEY } from './constants';

export function getMovieById( id, { videos, credits } = {} ) {

    return new Promise((resolve, reject) => {

        // Validation of arguments
        if (typeof id !== 'number') reject( new Error('Invalid argument "id"') );

        // Preparing url
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ru`;
        if (videos || credits) {
            const append = [];
            if (videos) append.push('videos');
            if (credits) append.push('credits');
            url += `&append_to_response=${append.toString()}`;
        }

        // Sending request
        fetch(url)
            .then( response => response.json() )
            .then( response => resolve(response) );

    });

}