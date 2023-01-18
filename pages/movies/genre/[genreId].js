import axios from "axios"
import MovieCard from "../../../components/movies/MovieCard"
import styles from "../../../styles/MovieGenre.module.css"

const MoviesGenrePage = ({ genre, page, totalPages }) => {
  // I think you get the id by using useRouter then store the data and then filter out the data !
  // And also adding the TITLE for Name of Genre

  // I think the currentPageNumber should have state in page then on Click of Next button the number incresase by one
  // and then router.push() to new pageNumber then you can get the pageNumber by context.parmas .

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {genre.map((movie) => {
          return <MovieCard movie={movie} />
        })}
      </div>
      <div className={styles.btnsContainer}>
        <button className={styles.btn}>Prevs</button>
        <div className={styles.pageNumber}>
          <p>
            Page {page} of {totalPages}
          </p>
        </div>
        <button className={styles.btn}>Next</button>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { genreId } = context.params
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=23926c8bcc18a11a1067ab6e760e50dc&with_genres=${genreId}&page=2`
  )

  return {
    props: {
      genre: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
    },
  }
}

export default MoviesGenrePage
