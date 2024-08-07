import React, { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';
import { useAppSelector } from "../../../redux/hooks";
import investmentsDatasets from "./investmentsDatasets";

export default function InvestmentChart() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const calculator = useAppSelector(store => store.calculator);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: new Array(calculator.months).fill(null).map((_, i) => `${i}`),
        datasets: investmentsDatasets(calculator),
      }
    });
    
    return () => chart.destroy();
  }, [calculator]);

  return (
    <canvas ref={canvasRef} id="investments-chart"></canvas>
  )
}