import axios from "axios"
import MovieCard from "../../../components/movies/MovieCard"
import styles from "../../../styles/MovieGenre.module.css"

const MoviesGenrePage = ({genre,page}) => {

    // I think you get the id by using useRouter then store the data and then filter out the data !

  return (
    <div className={styles.container}>
       {genre.map(movie => {
          return <MovieCard movie={movie}/>
       })}
    
    </div>
  )
}


export const getServerSideProps = async(context) => {
    const {genreId} =  context.params
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=23926c8bcc18a11a1067ab6e760e50dc&with_genres=${genreId}&page=1`)
    
    return {
        props: {
            genre: response.data.results,
            page: response.data.page
        }
    }
}



export default MoviesGenrePage
