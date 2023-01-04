import  styles from "../../styles/components/MovieCategory.module.css"
import Link from "next/link"
import Card from "./MovieCard"
import HorizontalCard from "./MovieHorizontalCard"

const MovieCategory = ({ data }) => {
  return (
    <div>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryDetails}>
          <h2 className={styles.name}>CATEGORY</h2>
          <div className={styles.badge}>BADGE</div>
        </div>
        {/* Need Category for Link */}
        <Link href={`/movie/`} className={styles.link}>
          See more
        </Link>
      </div>

      <div className={styles.cardsContainer}>
        {data.slice(0, 4).map((movie) => {
          return <Card movie={movie} />
        })}
      </div>

      <div className={styles.HorizontalCardsContainer}>
        {data
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, 2)
          .map((movie) => {
            return <HorizontalCard movie={movie} />
          })}
      </div>
    </div>
  )
}

export default MovieCategory
