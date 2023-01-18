import { moviesApi } from "../../axios"
import { useRouter } from "next/router"
import { useWatchListContext } from "../../context/watchList"

const SingleMoviePage = ({ movie, cast }) => {
  const { saved, setSaved } = useWatchListContext()

  const isMovieAddedToWatchList = saved.moviesList.find(
    (savedMovie) => savedMovie.id === movie.id
  )

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

  const handleAddMovieToWatchList = (movie) => {
    setSaved((prevState) => {
      return { ...prevState, moviesList: [...prevState.moviesList, movie] }
    })
    router.push("/bookmarked")
  }

  const handleRemoveMovie = (movieId) => {
    setSaved((prevState) => {
      return {
        ...prevState,
        moviesList: prevState.moviesList.filter((movie) => movie.id !== movieId),
      }
    })
    router.push("/bookmarked")
  }

  return (
    <div className="single-page-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`image of ${title}`}
        className="single-page-image"
      />
      <div className="single-page-content-details">
        <h2 className="single-page-title">{title}</h2>
        <p className="single-page-tagname">{tagline}</p>

        {/* Make a Rating Component */}

        <div className="single-page-details-container">
          <div>
            <p className="single-page-detail-title">Length</p>
            <p className="single-page-detail-text">{runtime} min</p>
          </div>
          <div>
            <p className="single-page-detail-title">Language</p>
            <p className="single-page-detail-text">ENGLISH</p>
          </div>
          <div>
            <p className="single-page-detail-title">Year</p>
            <p className="single-page-detail-text">{release_date.substring(0, 4)}</p>
          </div>
          <div>
            <p className="single-page-detail-title">status</p>
            <p className="single-page-detail-text">{adult ? "A" : "N/A"}</p>
          </div>
        </div>

        <p className={"single-page-sub-title"}>Genres</p>
        <div className={"single-page-genre-container"}>
          {genres.map((genre) => {
            return <Genre genre={genre.name} />
          })}
        </div>

        <p className={"single-page-sub-title"}>Synopsis</p>
        <p className={"single-page-overview-text"}>{overview}</p>

        <p className={"single-page-sub-title"}>Cast</p>
        {/* Loop over every object of cast and return a component */}
        <div className={"single-page-cast-container"}>
          {cast.cast.map((cast) => {
            return <Cast name={cast.name} />
          })}
        </div>

        <button className={"single-page-btn"} onClick={handleWebsiteClick}>
          Website
        </button>
        <button className={"single-page-btn"} onClick={handleImdbClick}>
          IMDB
        </button>

        {isMovieAddedToWatchList ? (
          <button className={"single-page-btn"} onClick={() => handleRemoveMovie(movie.id)}>
            Remove from WatchList
          </button>
        ) : (
          <button className={"single-page-btn"} onClick={() => handleAddMovieToWatchList(movie)}>
            {" "}
            Add to WatchList
          </button>
        )}
      </div>
    </div>
  )
}

const Genre = ({ genre }) => {
  return (
    <div className={"single-page-genre"}>
      <p className={"single-page-genre-text"}>{genre}</p>
    </div>
  )
}

const Cast = ({ name }) => {
  return (
    <div className={"single-page-cast"}>
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
