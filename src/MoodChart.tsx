// src/MoodChart.tsx

import React from "react";
import type { ChartOptions, TooltipItem } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import type { GratitudeEntry } from "./App"; // Reuse interface for date/text
import { analyzeSentiment } from "./SentimentUtils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface MoodChartProps {
  entries: GratitudeEntry[];
}

// Show the last 7 days' sentiment scores
export const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  // Generate data for the past 7 days (today included)
  const today = new Date();
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  // Map dates to sentiment scores
  const scores = dates.map(date => {
    const entry = entries.find(e => e.date === date);
    if (!entry) return 0;
    return analyzeSentiment(entry.text).score;
  });

  const colors = scores.map(score =>
    score > 0 ? "rgba(67,206,162,0.8)"
      : score < 0 ? "rgba(255,105,97,0.8)"
      : "rgba(189,189,189,0.7)"
  );

  const chartData = {
    labels: dates.map(d => d.slice(5)), // "MM-DD"
    datasets: [
      {
        label: "Sentiment",
        data: scores,
        backgroundColor: colors,
        borderColor: "#1976d2",
        fill: false,
        pointRadius: 6,
        tension: 0.25
      }
    ]
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const val = Number(context.parsed?.y ?? NaN);
            if (val === 1) return "Positive";
            if (val === 0) return "Neutral";
            if (val === -1) return "Negative";
            return "";
          }
        }
      }
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          callback: function (tickValue: string | number) {
            const v = Number(tickValue);
            if (v === 1) return "😊";
            if (v === 0) return "😐";
            if (v === -1) return "😞";
            return tickValue;
          }
        }
      }
    }
  };

  return (
    <div style={{ margin: "32px 0", background: "#f5fbfa", borderRadius: 16, padding: 16 }}>
      <h3 style={{ marginBottom: 8, color: "#1976d2", textAlign: "center" }}>
        Your Mood Trend (Last 7 Days)
      </h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MoodChart;
