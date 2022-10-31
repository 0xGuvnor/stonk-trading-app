import React, { useState } from "react";
import Chart from "react-apexcharts";

const StonkChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("d");
  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "d":
        return day;
      case "w":
        return week;
      case "y":
        return year;
      default:
        return day;
    }
  };

  const chartColour =
    determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y >
    0
      ? "#23CE6B"
      : "#DD1C1A";

  const options = {
    colors: [chartColour],
    title: { text: `$${symbol}`, align: "center", style: { fontSize: "24px" } },
    chart: { id: "stock data", animations: { speed: 1300 } },
    xaxis: { type: "datetime", labels: { datetimeUTC: false } },
    tooltip: { x: { format: "MMM dd - HH:MM" } },
  };

  const series = [{ name: symbol, data: determineTimeFormat() }];

  const renderButtonSelect = (button) => {
    const baseStyling = "btn m-1";
    if (button === dateFormat) {
      return `${baseStyling} btn-primary`;
    } else {
      return `${baseStyling} btn-outline-primary`;
    }
  };

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={renderButtonSelect("d")}
          onClick={() => setDateFormat("d")}
        >
          1d
        </button>
        <button
          className={renderButtonSelect("w")}
          onClick={() => setDateFormat("w")}
        >
          1w
        </button>
        <button
          className={renderButtonSelect("y")}
          onClick={() => setDateFormat("y")}
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default StonkChart;
