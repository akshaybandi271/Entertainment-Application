import styles from "../../styles/components/TvShowsCategory.module.css"
import Link from "next/link"
import Card from "./TvShowCard"
import HorizontalCard from "./TvShowHorizontalCard"

const TvShowCategory = ({ data }) => {
  return (
    <div>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryDetails}>
          <h2 className={styles.name}>CATEGORY</h2>
          <div className={styles.badge}>BADGE</div>
        </div>
        <Link href={`/tv/`} className={styles.link}>
          See more
        </Link>
      </div>

      <div className={styles.cardsContainer}>
        {data.slice(0, 4).map((tvshow) => {
          return <Card tvshow={tvshow} />
        })}
      </div>

      <div className={styles.HorizontalCardsContainer}>
        {data
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, 2)
          .map((tvshow) => {
            return <HorizontalCard tvshow={tvshow} />
          })}
      </div>
    </div>
  )
}

export default TvShowCategory
