"use client"

import { useState } from "react"
import {
  ShoppingBag,
  Coffee,
  Film,
  Utensils,
  Plane,
  Smartphone,
  Home,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const creditCards = [
  {
    name: "TD Bank",
    amountOwed: 127.38,
    totalBalance: 1300,
    dueDate: "01/06/2025",
    percentUsed: 10,
    totalUsage: 26,
    rewards: null,
  },
  {
    name: "Amex",
    amountOwed: 1741.75,
    totalBalance: 8000,
    dueDate: "16/05/2025",
    percentUsed: 22,
    totalUsage: 26,
    rewards: "58,240 pts ($728 travel)",
  },
  {
    name: "Chase",
    amountOwed: 1699.96,
    totalBalance: 4000,
    dueDate: "03/06/2025",
    percentUsed: 42,
    totalUsage: 26,
    rewards: "$124.50 (statement credit)",
  },
  {
    name: "Cap One",
    amountOwed: 1006.94,
    totalBalance: 4500,
    dueDate: "27/05/2025",
    percentUsed: 22,
    totalUsage: 26,
    rewards: "42,850 pts ($428 travel)",
  },
]

export default function CreditCardsPage() {
  const [activeCard, setActiveCard] = useState(0)

  const cards = creditCards.map((card, index) => {
    const limit = card.totalBalance
    const balance = card.amountOwed
    return {
      id: index + 1,
      name: card.name,
      number: "**** **** **** " + (4582 + index),
      expiry: card.dueDate.slice(3),
      balance,
      limit,
      color:
        card.name === "Chase"
          ? "bg-gradient-to-r from-blue-600 to-blue-900"
          : card.name === "Amex"
          ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
          : card.name === "Cap One"
          ? "bg-gradient-to-r from-purple-600 to-purple-900"
          : "bg-gradient-to-r from-green-600 to-green-900",
      textColor: "text-white",
      logo: card.name,
    }
  })

  const card = cards[activeCard]
  const utilization = (card.balance / card.limit) * 100
  const utilizationClass =
    utilization < 30 ? "text-emerald-500" : utilization < 50 ? "text-yellow-500" : "text-red-500"

  return (
    <>
      {/* Top Grid: Card + Utilization + Weekly Planner */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {/* Card Slider */}
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
                <div className="text-sm font-medium">{card.name} Preferred</div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setActiveCard((prev) => (prev === 0 ? cards.length - 1 : prev - 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setActiveCard((prev) => (prev === cards.length - 1 ? 0 : prev + 1))}>
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

        {/* Credit Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Utilization</CardTitle>
            <CardDescription>Your current credit usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Overall Utilization</div>
                  <div className="text-sm text-muted-foreground">
                    28% <span className="text-emerald-500">(Good)</span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[28%]" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Experts recommend keeping utilization under 30%
                </p>
              </div>
              {creditCards.map((card) => (
                <div key={card.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{card.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ${card.amountOwed.toLocaleString()} / ${card.totalBalance.toLocaleString()}
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${card.percentUsed}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Payment Planner */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Payment Planner</CardTitle>
            <CardDescription>Upcoming due dates and payment amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditCards.map((card) => (
                <div key={card.name} className="flex justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{card.name}</div>
                    <div className="text-xs text-muted-foreground">Due: {card.dueDate}</div>
                  </div>
                  <div className="text-sm font-bold">${card.amountOwed.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
