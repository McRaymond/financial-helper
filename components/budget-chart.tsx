"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function BudgetChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [monthlyData, setMonthlyData] = useState<{ [key: string]: { income: number, expenses: number, savings: number } }>({})

  useEffect(() => {
    fetch("/api/analytics")
      .then(res => res.json())
      .then(data => setMonthlyData(data))
  }, [])

  useEffect(() => {
    if (chartRef.current && Object.keys(monthlyData).length > 0) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const getValue = (key: string) => labels.map(m => monthlyData[m]?.[key] ?? 0)

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Income",
                data: getValue("totalBalance"),
                borderColor: "rgb(16, 185, 129)",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.3,
                fill: true,
              },
              {
                label: "Expenses",
                data: getValue("expenses"),
                borderColor: "rgb(239, 68, 68)",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                tension: 0.3,
                fill: true,
              },
              {
                label: "Savings",
                data: getValue("savings"),
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value,
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [monthlyData])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
