import {moviesApi,tvShowsApi} from "../axios"

const movieCategories = ["popular","upcoming","top_rated"]
const tvCategories = ["popular","top_rated"]

 const getMovies = async() => {
    const values = await Promise.all(movieCategories.map(category => moviesApi.get(category)))
      return values
 }

 const getTvShows = async() => {
     const values = await Promise.all(tvCategories.map(category => tvShowsApi.get(category)))
     return values
 }

 export {getMovies,getTvShows}