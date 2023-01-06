import '../styles/globals.css'
import Search from '../components/Search'
import Sidebar from '../components/Sidebar'
import WatchListContextProvider from '../context/watchList'

export default function App({ Component, pageProps }) {
  return (
   
      <>
        <WatchListContextProvider>
            <Search />
            <div className="main"> 
              <Sidebar />
              <Component {...pageProps} />
            </div>
          </WatchListContextProvider>
      </>
   
  )
}
