import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import StonkChart from "../components/StonkChart";
import StonkData from "../components/StonkData";

const formatData = (data) =>
  data.t.map((el, index) => ({
    x: el * 1000,
    y: Math.round(data.c[index] * 100) / 100,
  }));

const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();

  const getChartData = (res, start, end) =>
    finnHub.get("/stock/candle", {
      params: { symbol, resolution: res, from: start, to: end },
    });

  const fetchData = async () => {
    const date = new Date();
    const currentTime = Math.floor(
      date.getTime() / 1000
    ); /* convert time in 'ms' to 's' for FinnHub API */
    let oneDay;
    if (date.getDay() === 6) {
      oneDay = currentTime - 60 * 60 * 24 * 2;
    } else if (date.getDay() === 0) {
      oneDay = currentTime - 60 * 60 * 24 * 3;
    } else {
      oneDay = currentTime - 60 * 60 * 24;
    }
    const oneWeek = currentTime - 60 * 60 * 24 * 7;
    const oneYear = currentTime - 60 * 60 * 24 * 365;

    try {
      const responses = await Promise.all([
        getChartData(30, oneDay, currentTime),
        getChartData(60, oneWeek, currentTime),
        getChartData("W", oneYear, currentTime),
      ]);

      setChartData({
        day: formatData(responses[0].data),
        week: formatData(responses[1].data),
        year: formatData(responses[2].data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return (
    <div>
      {chartData && (
        <div>
          <StonkChart chartData={chartData} symbol={symbol} />
          <StonkData symbol={symbol} />
        </div>
      )}
    </div>
  );
};

export default StockDetailPage;
