import { useRouter } from "next/router"
import { tvShowsApi } from "../../axios"
import { useWatchListContext } from "../../context/watchList"
import styles from "../../styles/Tvshows.module.css"

const SingleTvShowPage = ({ tvshow, cast }) => {
  const router = useRouter()
  const { saved, setSaved } = useWatchListContext()

  const isTvshowAddedToWatchList = saved.tvshowsList.find((show) => show.id === tvshow.id)

  const handleAddTvshow = (tvshow) => {
      setSaved(prevState => {
        return {...prevState, tvshowsList: [...prevState.tvshowsList, tvshow]}
      })
  }

  const {
    adult,
    genres,
    homepage,
    title,
    overview,
    poster_path,
    first_air_date,
    last_air_date,
    spoken_languages,
    tagline,
    status,
  } = tvshow

  const languages = spoken_languages.map((language) => language.english_name)


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
            <p className={styles.detailTitle}>Language</p>
            <p className={styles.detailText}>
              {languages[0]} , {languages[1]}
            </p>
          </div>
          <div>
            <p className={styles.detailTitle}>First Air</p>
            <p className={styles.detailText}>{first_air_date}</p>
          </div>
          <div>
            <p className={styles.detailTitle}>Last Air</p>
            <p className={styles.detailText}>{last_air_date}</p>
          </div>
          <div>
            <p className={styles.detailTitle}>status</p>
            <p className={styles.detailText}>{status}</p>
          </div>
        </div>

        <p className={styles.subTitle}>Genres</p>
        <div className={styles.genreContainer}>
          {genres.map((genre) => {
            return <Genre genre={genre.name} />
          })}
        </div>

        <p className={styles.subTitle}>Synopsis</p>
        <p className={styles.overviewText}>{overview}</p>

        <p className={styles.subTitle}>Cast</p>
        {/* Loop over every object of cast and return a component */}
        <div className={styles.castContainer}>
          {cast.cast.map((cast) => {
            return <Cast name={cast.name} />
          })}
        </div>

        {homepage && (
          <button className={styles.btn} onClick={handleWebsiteClick}>
            Website
          </button>
        )}

        {isTvshowAddedToWatchList ? (
          <button className={styles.btn} onClick={() => router.push("/bookmarked")}>
            Go to WatchList
          </button>
        ) : (
          <button className={styles.btn} onClick={() => handleAddTvshow(tvshow)}>
            Add to WatchList
          </button>
        )}
      </div>
    </div>
  )
}

const Genre = ({ genre }) => {
  return (
    <div className={styles.genre}>
      <p className={styles.genreText}>{genre}</p>
    </div>
  )
}

const Cast = ({ name }) => {
  return (
    <div className={styles.cast}>
      <p>{name}</p>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { tvshowId } = context.params

  const response = await Promise.all([
    tvShowsApi.get(tvshowId),
    tvShowsApi(`${tvshowId}/credits`),
  ])

  const [tvshowResponse, castResponse] = response

  return {
    props: {
      tvshow: tvshowResponse.data,
      cast: castResponse.data,
    }
  }
}

export default SingleTvShowPage
