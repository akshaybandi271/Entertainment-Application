import { genresApi } from "../../axios"
import styles from "../../styles/MovieGenres.module.css"
import Link from "next/link"


const Movies = ({ genres }) => {
  return (
    <div className={styles.genresContainer}>
      {genres.map((genre, index) => {
        return <Genre genre={genre} index={index} />
      })}
    </div>
  )
}

const Genre = ({ genre, index }) => {
  const backgroundStyle = {
    backgroundColor: index % 2 !== 0 ? "#0E7490" : null,
  }

  return (
    <Link href={`/movies/genre/${genre.id}`} className={styles.link}>
      <div className={styles.genre} style={backgroundStyle}>
        <p>{genre.name}</p>
      </div>
    </Link>
  )
}

export const getStaticProps = async () => {
  const response = await genresApi.get(`movie/list`)

  return {
    props: {
      genres: response.data.genres,
    },
  }
}

export default Movies
