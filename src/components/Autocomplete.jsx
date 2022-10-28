import React, { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { useGlobalWatchListContext } from "../context/watchListContext";

const Autocomplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { addStonk } = useGlobalWatchListContext();

  const showDropdown = () => {
    const show = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${show}`}
      >
        {results.map((result) => (
          <li
            key={result.symbol}
            className="dropdown-item"
            onClick={() => {
              addStonk(result.symbol);
              setSearch("");
            }}
          >
            {result.description} ({result.symbol})
          </li>
        ))}
      </ul>
    );
  };

  const fetchData = async (isMounted) => {
    try {
      const response = await finnHub.get("/search", { params: { q: search } });
      if (isMounted) setResults(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (search.length > 0) {
      fetchData(isMounted);
    } else {
      setResults([]);
    }

    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search Stonks"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search Stonks</label>
        {showDropdown()}
      </div>
    </div>
  );
};

export default Autocomplete;
