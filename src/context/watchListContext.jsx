import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const WatchListContext = createContext();

const useGlobalWatchListContext = () => useContext(WatchListContext);

const WatchListContextProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || ["GME", "TSLA", "PLTR"]
  );

  const addStonk = (stonk) => {
    if (!watchList.includes(stonk)) setWatchList([...watchList, stonk]);
  };

  const deleteStonk = (stonk) => {
    setWatchList(watchList.filter((el) => el !== stonk));
  };

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  return (
    <WatchListContext.Provider value={{ watchList, addStonk, deleteStonk }}>
      {children}
    </WatchListContext.Provider>
  );
};

export { WatchListContextProvider, useGlobalWatchListContext };
