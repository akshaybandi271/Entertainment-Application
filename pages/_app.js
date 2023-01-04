import '../styles/globals.css'
import Search from '../components/Search'
import Sidebar from '../components/Sidebar'

export default function App({ Component, pageProps }) {
  return (
      <>
        <Search />
        <div className="main"> 
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </>
  )
}
