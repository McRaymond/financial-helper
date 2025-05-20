"use client"

import { useState } from "react"
import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CreditCardSummary() {
  const [activeCard, setActiveCard] = useState(0)

  const cards = [
    {
      id: 1,
      name: "Chase Sapphire Preferred",
      number: "**** **** **** 4582",
      expiry: "05/28",
      balance: 1240,
      limit: 5000,
      color: "bg-gradient-to-r from-blue-600 to-blue-900",
      textColor: "text-white",
      logo: "Chase",
    },
    {
      id: 2,
      name: "Citi Double Cash",
      number: "**** **** **** 7891",
      expiry: "09/27",
      balance: 2350,
      limit: 8000,
      color: "bg-gradient-to-r from-slate-700 to-slate-900",
      textColor: "text-white",
      logo: "Citi",
    },
    {
      id: 3,
      name: "American Express Gold",
      number: "**** **** **** 2345",
      expiry: "12/26",
      balance: 1850,
      limit: 7500,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      textColor: "text-white",
      logo: "Amex",
    },
  ]

  const nextCard = () => {
    setActiveCard((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
  }

  const prevCard = () => {
    setActiveCard((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
  }

  const card = cards[activeCard]
  const utilization = (card.balance / card.limit) * 100
  const utilizationClass = utilization < 30 ? "text-emerald-500" : utilization < 50 ? "text-yellow-500" : "text-red-500"

  return (
    <Card className="flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className={`relative ${card.color} p-6 rounded-t-lg flex-1 flex flex-col justify-between`}>
          <div className={`flex justify-between items-start ${card.textColor}`}>
            <div className="text-lg font-bold">{card.logo}</div>
            <CreditCard className="h-8 w-8" />
          </div>
          <div className={`mt-4 ${card.textColor}`}>
            <div className="text-sm opacity-80">Card Number</div>
            <div className="font-mono text-lg">{card.number}</div>
          </div>
          <div className={`flex justify-between mt-4 ${card.textColor}`}>
            <div>
              <div className="text-sm opacity-80">Card Holder</div>
              <div>John Doe</div>
            </div>
            <div>
              <div className="text-sm opacity-80">Expires</div>
              <div>{card.expiry}</div>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{card.name}</div>
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevCard}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextCard}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Balance</span>
              <span className="font-medium">${card.balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Credit Limit</span>
              <span className="font-medium">${card.limit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Available Credit</span>
              <span className="font-medium">${(card.limit - card.balance).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Utilization</span>
              <span className={`font-medium ${utilizationClass}`}>{utilization.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
              <div
                className={`h-full ${utilization < 30 ? "bg-emerald-500" : utilization < 50 ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: `${utilization}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
