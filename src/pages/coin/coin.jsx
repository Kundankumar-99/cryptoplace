import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/coincontext";
import { useEffect } from "react";
import LineChart from "../../component/LineChart/LineChart";
import "../coin/coin.css";

export default function Coin() {
  const [coinData, setCoinData] = useState(null);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const { currency } = useContext(CoinContext);
  const { coinId } = useParams();

  //ApI data Fetch For the ShowCase The Detail On the Page.

  const fetchcoindata = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const allcoindata = await response.json();
      setCoinData(allcoindata);
    } catch (error) {
      setError(error.message || "Failed to fetch data");
    }
  };

  //ApI data Fetch For the Line Chart

  const fetchlinechart = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name.toLowerCase()}&days=10&interval=daily`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const lineChartData = await response.json();
      setHistoricalData(lineChartData);
    } catch (error) {
      setError(error.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchcoindata();
    fetchlinechart();
  }, [coinId, currency]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!coinData && historicalData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="coinlayout">
        <div className="coin">
          <img src={coinData.image?.large} alt={`${coinData.name} logo`} />
          <p>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </p>
        </div>

        {/* Market Detail Table Layout  */}

        <LineChart historicalData={historicalData} />

        <div className="Coindatatable">
          <ul>
            <li>Market Cap rank </li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price </li>
            <li>
              {" "}
              {currency.Symbol}{" "}
              {coinData.market_data.current_price[
                currency.name.toLowerCase()
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market cap </li>
            <li>
              {coinData.market_data.market_cap[
                currency.name.toLowerCase()
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high </li>
            <li>
              {coinData.market_data.high_24h[
                currency.name.toLowerCase()
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low </li>
            <li>
              {coinData.market_data.low_24h[
                currency.name.toLowerCase()
              ].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
