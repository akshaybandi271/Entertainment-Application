import { useWatchListContext } from "../context/watchList"
import MovieCard from "../components/movies/MovieCard"
import styles from "../styles/bookmarked.module.css"
import TvShowCard from "../components/tvShows/TvShowCard"

const BookmarkedPage = () => {
  const { saved } = useWatchListContext()

  return (
    <div className={styles.container}>
      <h3>List of Movies</h3>
      {saved.moviesList.length ? (
        <div className={styles.showsContainer}>
          {saved.moviesList.map((movie) => {
            return <MovieCard movie={movie} />
          })}
        </div>
      ) : (
        ""
      )}

      <h3>List of Tvshows</h3>
      <div className={styles.showsContainer}>
        {saved.tvshowsList.map((tvshow) => {
          return <TvShowCard tvshow={tvshow} />
        })}
      </div>

      {!saved.moviesList.length && !saved.tvshowsList.length && (
        <p>Watch Later is Empty</p>
      )}
    </div>
  )
}

export default BookmarkedPage
