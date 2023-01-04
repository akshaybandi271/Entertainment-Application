import { moviesApi } from "../../axios"
import { useRouter } from "next/router"
import styles from "../../styles/Movie.module.css"

const SingleMoviePage = ({ movie, cast }) => {

  const router = useRouter()
  const {
    adult,
    genres,
    homepage,
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    spoken_languages,
    imdb_id,
    tagline,
  } = movie

  const handleWebsiteClick = () => {
    router.push(homepage)
  }
  const handleImdbClick = () => {
    router.push(`https://www.imdb.com/title/${imdb_id}`)
  }

  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`image of ${title}`}
        className={styles.image}
      />
      <div className={styles.movieDetails}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.tagname}>{tagline}</p>

        {/* Make a Rating Component */}

        <div className={styles.detailsContainer}>
            <div>
                <p className={styles.detailTitle}>Length</p>
                <p className={styles.detailText}>{runtime} min</p>
            </div>
            <div>
                <p className={styles.detailTitle}>Language</p>
                <p className={styles.detailText}>ENGLISH</p>
            </div>
            <div>
                <p className={styles.detailTitle}>Year</p>
                <p className={styles.detailText}>{release_date.substring(0,4)}</p>
            </div>
            <div>
                <p className={styles.detailTitle}>status</p>
                <p className={styles.detailText}>{adult ? "A" : "N/A"}</p>
            </div>
        </div>

        <p className={styles.subTitle}>Genres</p>
        <div className={styles.genreContainer}>
            {genres.map(genre => {
                return <Genre genre={genre.name} /> 
            })}
        </div>

        <p className={styles.subTitle}>Synopsis</p>
        <p className={styles.overviewText}>{overview}</p>

        <p className={styles.subTitle}>Cast</p>
        {/* Loop over every object of cast and return a component */}
         <div className={styles.castContainer}>
            {cast.cast.map(cast => {
                return <Cast name={cast.name}/>
            })}
         </div>

        <button className={styles.btn} onClick={handleWebsiteClick}>Website</button>
        <button className={styles.btn} onClick={handleImdbClick}>IMDB</button>
      </div>
    </div>
  )
}

 const Genre = ({genre}) => {
     return (
        <div className={styles.genre}>
            <p className={styles.genreText}>{genre}</p>
        </div>
     )
 }

 const Cast = ({name}) => {
    return (
        <div className={styles.cast}>
            <p>{name}</p>
        </div>
    )
 }

export const getServerSideProps = async (context) => {
  const { movieId } = context.params

  const response = await Promise.all([
    moviesApi.get(movieId),
    moviesApi.get(`${movieId}/credits`),
  ])

  const [movieResponse, castResponse] = response

  return {
    props: {
      movie: movieResponse.data,
      cast: castResponse.data,
    },
  }
}

export default SingleMoviePage
