
import Link from "next/link"
import styles from "../../styles/components/TvShowsCard.module.css"


const TvShowCard = ({tvshow}) => {

    const {id,original_title,backdrop_path,release_date,first_air_date,original_name} = tvshow

    let title = ""

    if(original_title){
      title = original_title.length > 24 ? `${original_title.substring(0,24)}...` : original_title
    } else {
      title = original_name.length > 24 ? `${original_name.substring(0,24)}...` : original_name
    }

    let releaseYear = ""

    if(release_date){
      releaseYear = release_date.substring(0,4)
    }else{
       releaseYear = first_air_date.substring(0,4)
    }
    

  return (
    <Link href={`/tvshows/${id}`} className={styles.link}>
      <div className={styles.card}>
        <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} className="image"  />
        <p className={styles.details}>{releaseYear}  tvshow</p>
        <p className={styles.title}>
            {title}
        </p>
      </div>
    </Link>
  )
}

export default TvShowCard
