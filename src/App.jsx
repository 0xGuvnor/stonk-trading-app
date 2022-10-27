import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<StockOverviewPage />} />
          <Route path="/detail/:ticker" element={<StockDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
