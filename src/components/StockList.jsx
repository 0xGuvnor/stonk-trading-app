import React from "react";
import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import { useGlobalWatchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

const StockList = () => {
  const [stonk, setStonk] = useState([]);
  const { watchList, deleteStonk } = useGlobalWatchListContext();
  const navigate = useNavigate();

  const changeColour = (value) => {
    return value < 0 ? "danger" : "success";
  };

  const selectIcon = (value) => {
    return value < 0 ? <BiCaretDown /> : <BiCaretUp />;
  };

  const fetchData = async (mountStatus) => {
    try {
      const responses = await Promise.all(
        watchList.map((stock) =>
          finnHub.get("/quote", { params: { symbol: stock } })
        )
      );
      const data = responses.map((response) => {
        return { data: response.data, symbol: response.config.params.symbol };
      });

      if (mountStatus) {
        setStonk(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStonkSelect = (ticker) => {
    navigate(`detail/${ticker}`);
  };

  useEffect(() => {
    let isMounted = true;

    fetchData(isMounted);

    return () => (isMounted = false);
  }, [watchList]);

  return (
    <table className="table hover mt-5">
      <thead style={{ color: "rgb(79,89,102)" }}>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chg</th>
          <th scope="col">Chg %</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">Prev. Close</th>
        </tr>
      </thead>
      <tbody>
        {stonk.map((stonkData) => (
          <tr
            className="table-row"
            key={stonkData.symbol}
            style={{ cursor: "pointer" }}
            onClick={() => handleStonkSelect(stonkData.symbol)}
          >
            <th scope="row">{stonkData.symbol}</th>
            <td>{stonkData.data.c}</td>
            <td className={`text-${changeColour(stonkData.data.d)}`}>
              {stonkData.data.d}
              {selectIcon(stonkData.data.d)}
            </td>
            <td className={`text-${changeColour(stonkData.data.dp)}`}>
              {stonkData.data.dp}
              {selectIcon(stonkData.data.dp)}
            </td>
            <td>{stonkData.data.h}</td>
            <td>{stonkData.data.l}</td>
            <td>{stonkData.data.o}</td>
            <td>
              {stonkData.data.pc}{" "}
              <button
                className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteStonk(stonkData.symbol);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockList;
