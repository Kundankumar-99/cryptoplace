import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function LineChart({ historicalData }) {
  const [data, setData] = useState([["Dates", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Dates", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
        setData(dataCopy);
      });
    }
  }, [historicalData]);

  return (
    <div>
      
      <Chart
        chartType="LineChart"
        data={data}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
}
