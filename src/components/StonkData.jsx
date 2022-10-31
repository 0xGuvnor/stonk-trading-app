import React, { useState } from "react";
import { useEffect } from "react";
import finnHub from "../apis/finnHub";

const StonkData = ({ symbol }) => {
  const [stonkData, setStonkData] = useState();

  const fetchData = async () => {
    try {
      const response = await finnHub.get("/stock/profile2", {
        params: { symbol },
      });
      setStonkData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return (
    <div>
      {stonkData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5 mb-5">
          <div className="col">
            <div>
              <span className="fw-bold">Name: </span>
              {stonkData.name}
            </div>
            <div>
              <span className="fw-bold">Country: </span>
              {stonkData.country}
            </div>
            <div>
              <span className="fw-bold">Ticker: </span>
              {stonkData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stonkData.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stonkData.finnhubIndustry}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
              {stonkData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Market Cap: </span>$
              {Math.round(stonkData.marketCapitalization * 1_000_000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div>
              <span className="fw-bold">Shares Outstanding: </span>
              {Math.round(stonkData.shareOutstanding * 1_000_000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div>
              <span className="fw-bold">Website: </span>
              <a
                href={stonkData.weburl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stonkData.weburl}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StonkData;
