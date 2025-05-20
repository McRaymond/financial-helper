"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function CreditCardSpendingChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Shopping", "Dining", "Travel", "Entertainment", "Bills", "Groceries", "Other"],
            datasets: [
              {
                label: "Chase Sapphire",
                data: [250, 180, 650, 120, 80, 150, 90],
                backgroundColor: "rgba(37, 99, 235, 0.7)",
                borderColor: "rgba(37, 99, 235, 1)",
                borderWidth: 1,
              },
              {
                label: "Citi Double Cash",
                data: [320, 150, 80, 220, 450, 180, 120],
                backgroundColor: "rgba(71, 85, 105, 0.7)",
                borderColor: "rgba(71, 85, 105, 1)",
                borderWidth: 1,
              },
              {
                label: "Amex Gold",
                data: [180, 420, 150, 180, 120, 350, 150],
                backgroundColor: "rgba(234, 179, 8, 0.7)",
                borderColor: "rgba(234, 179, 8, 1)",
                borderWidth: 1,
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
              tooltip: {
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || ""
                    if (label) {
                      label += ": "
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(context.parsed.y)
                    }
                    return label
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: false,
              },
              y: {
                stacked: false,
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

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
