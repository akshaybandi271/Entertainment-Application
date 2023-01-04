import axios from "axios"

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

// https://api.themoviedb.org/3/discover/movie?api_key=23926c8bcc18a11a1067ab6e760e50dc&with_genres=12

export const moviesApi =  axios.create({
    baseURL : `https://api.themoviedb.org/3/movie`,
    params: {
        api_key: "23926c8bcc18a11a1067ab6e760e50dc",
        language: "en-US",
        page: 1
    }
})

export const tvShowsApi = axios.create({
    baseURL: `https://api.themoviedb.org/3/tv`,
    params: {
        api_key: "23926c8bcc18a11a1067ab6e760e50dc",
        language: "en-US",
        page: 1
    }
})

export const genresApi = axios.create({
    baseURL: `https://api.themoviedb.org/3/genre`,
    params: {
        api_key: "23926c8bcc18a11a1067ab6e760e50dc",
        language: "en-US",
        page: 1
    }
})

export const movieGenreApi = axios.create({
    baseURL: `https://api.themoviedb.org/3/discover/movie`,
    params: {
        api_key: "23926c8bcc18a11a1067ab6e760e50dc",
        language: "en-US",
        page: 1
    }
})