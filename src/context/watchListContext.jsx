import { createContext, useContext, useState } from "react";

const WatchListContext = createContext();

const useGlobalWatchListContext = () => useContext(WatchListContext);

const WatchListContextProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(["AAPL"]);

  const addStonk = (stonk) => {
    if (!watchList.includes(stonk)) setWatchList([...watchList, stonk]);
  };

  const deleteStonk = (stonk) => {
    setWatchList(watchList.filter((el) => el !== stonk));
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStonk, deleteStonk }}>
      {children}
    </WatchListContext.Provider>
  );
};

export { WatchListContextProvider, useGlobalWatchListContext };
