import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";

const StockDetailPage = () => {
  const { symbol } = useParams();

  const fetchData = async () => {
    const resolution = 30;
    const date = new Date();
    const to = Math.floor(
      date.getTime() / 1000
    ); /* convert time in ms to seconds for API */
    let oneDay;
    if (date.getDay() === 6) {
      oneDay = to - 60 * 60 * 24 * 2;
    } else if (date.getDay() === 0) {
      oneDay = to - 60 * 60 * 24 * 3;
    } else {
      oneDay = to - 60 * 60 * 24;
    }
    const oneWeek = to - 60 * 60 * 24 * 7;
    const oneYear = to - 60 * 60 * 24 * 365;

    const response = await finnHub.get("/stock/candle", {
      params: { symbol, resolution, to, from },
    });
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>StockDetailPage</div>;
};

export default StockDetailPage;
