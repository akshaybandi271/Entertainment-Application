import styles from "../styles/components/Search.module.css"

const Search = () => {
  return (
    <header className={styles.search}>
      <div>
        <svg
          className={styles.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#fff"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input type="text" placeholder="Search" className={styles.searchInput}/>
      </div>

      <button className={styles.btn}>Search</button>
    </header>
  )
}

export default Search
