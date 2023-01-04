import { useRouter } from "next/router"
import { tvShowsApi } from "../../axios"
import styles from "../../styles/Tvshows.module.css"


const SingleTvShowPage = ({ tvshows, cast }) => {

    // if homepage is falsy then doesnot render the button

    const router = useRouter()
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
      status
    } = tvshows

    const languages = spoken_languages.map(language => language.english_name)
    console.log(languages)

    console.log(tvshows)
  
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
                  <p className={styles.detailText}>{languages[0]} , {languages[1]}</p>
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
  
        {homepage &&  <button className={styles.btn} onClick={handleWebsiteClick}>Website</button>}
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


 export const getServerSideProps = async(context) => {
    const {tvshowId} = context.params

    const response = await Promise.all([tvShowsApi.get(tvshowId),tvShowsApi(`${tvshowId}/credits`)])

    const [tvshowResponse,castResponse ] = response
 
    return {
        props: {
            tvshows:  tvshowResponse.data,
            cast: castResponse.data
        }
    }


 }

export default SingleTvShowPage
