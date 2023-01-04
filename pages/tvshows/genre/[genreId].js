import axios from "axios"
import styles from "../../../styles/TvshowGenre.module.css"
import TvShowCard from "../../../components/tvShows/TvShowCard"

const TvshowsGenre = ({tvshows,page}) => {

  return (
      <div className={styles.container}>
          {tvshows.map(tvshow => {
             return <TvShowCard tvshow={tvshow}/> 
          })}
      </div>
  )
}

export const getServerSideProps = async(context) => {
    const {genreId} = context.params

    const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=23926c8bcc18a11a1067ab6e760e50dc&with_genres${genreId}`)

    return {
        props: {
            tvshows: response.data.results,
            page: response.data.page,
            totalPage: response.data.total_pages
        }
    }


}

export default TvshowsGenre
