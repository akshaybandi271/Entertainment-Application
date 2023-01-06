import { createContext, useContext, useEffect, useState } from "react";


const WatchListContext = createContext()

const WatchListContextProvider = ({children}) => {

 let savedList = null

    if (typeof window !== "undefined") {
     savedList = JSON.parse(localStorage.getItem("savedList"))
}


    const [saved,setSaved] = useState( savedList || {
        moviesList: [],
        tvshowsList: []
    })

    useEffect(()=>{
        localStorage.setItem("savedList",JSON.stringify(saved))
    },[saved])

    return (
        <WatchListContext.Provider value={{
            saved,
            setSaved
        }}>
            {children}
        </WatchListContext.Provider>
    )
}

export const useWatchListContext = () =>  useContext(WatchListContext)

export default WatchListContextProvider