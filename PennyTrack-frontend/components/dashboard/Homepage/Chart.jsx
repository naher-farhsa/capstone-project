import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ income, expense }) => {
  const chartRef = useRef();

  useEffect(() => {
    let myChart = null;

    if (chartRef.current && income > 0 && expense > 0) {
      const ctx = chartRef.current.getContext("2d");

      if (myChart !== null) {
        myChart.destroy();
      }

      myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Income", "Expense"],
          datasets: [
            {
              data: [income, expense],
              backgroundColor: ["#abd4b8", "#9BC34A"],
            },
          ],
        },
      });
    }

    // Cleanup on unmount
    return () => {
      if (myChart !== null) {
        myChart.destroy();
      }
    };
  }, [income, expense]);

  if (income <= 0 || expense <= 0) {
    return null;
  }

  return (
    <div className="w-1/2 border-2 border-light-green-500 rounded-xl grid place-items-center">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
