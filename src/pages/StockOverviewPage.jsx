import React from "react";
import Autocomplete from "../components/Autocomplete";
import StockList from "../components/StockList";
import Stonks from "../images/Stonks.avif";

const StockOverviewPage = () => {
  return (
    <div>
      <div className="text-center">
        <img src={Stonks} width={300} alt="stonks logo" />
      </div>
      <Autocomplete />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
