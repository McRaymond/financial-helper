"use client"

import { useEffect, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  RotateCw,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreditCardsPage() {
  const [activeCard, setActiveCard] = useState(0)
  const [creditCards, setCreditCards] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editableCard, setEditableCard] = useState(null)
  const [paymentPlan, setPaymentPlan] = useState([])
  const [paidStatus, setPaidStatus] = useState({})
  const [weeklyBudget, setWeeklyBudget] = useState(200)

  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then((data) => {
        setCreditCards(data)
        setEditableCard(data[0])
      })
  }, [])

  const regeneratePaymentPlan = async () => {
    const latestCards = await fetch("/api/cards").then(res => res.json())
    setCreditCards(latestCards)
    fetch("/api/payment-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cards: latestCards.map(card => ({
          name: card.name,
          amountOwed: card.amountOwed,
          dueDate: card.dueDate?.split("/").reverse().join("-") || ""
        })),
        weeklyBudget: weeklyBudget
      })
    })
      .then(res => res.json())
      .then(data => setPaymentPlan(data))
  }

  useEffect(() => {
    regeneratePaymentPlan()
  }, [])

  const handleFieldChange = (field, value) => {
    setEditableCard({ ...editableCard, [field]: value })
  }

  const handleSave = async () => {
    setIsEditing(false)
    await fetch("/api/cards", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editableCard),
    })
    const updatedCards = creditCards.map((card) =>
      card.name === editableCard.name ? editableCard : card
    )
    setCreditCards(updatedCards)
    regeneratePaymentPlan()
  }

  if (creditCards.length === 0) return <div className="p-4">Loading cards...</div>

  const card = editableCard
  const utilization = (card.amountOwed / card.totalBalance) * 100
  const utilizationClass =
    utilization < 30 ? "text-emerald-500" : utilization < 50 ? "text-yellow-500" : "text-red-500"

  const cardColor =
    card.name === "Chase"
      ? "bg-gradient-to-r from-blue-600 to-blue-900"
      : card.name === "American Express"
      ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
      : card.name === "Capital One"
      ? "bg-gradient-to-r from-purple-600 to-purple-900"
      : "bg-gradient-to-r from-green-600 to-green-900"

  const togglePaid = (index) => {
    setPaidStatus(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      {/* Card Slider */}
      <Card className="flex flex-col text-base h-full min-h-[450px]">
        <CardContent className="p-0 flex-1 flex flex-col">
          <div className={`relative ${cardColor} p-6 rounded-t-lg flex-1 flex flex-col justify-between`}>
            <div className={`flex justify-between items-start text-white`}>
              <div className="text-lg font-bold">{card.name}</div>
              <CreditCard className="h-8 w-8" />
            </div>
            <div className="mt-4 text-white">
              <div className="text-sm opacity-80">Card Number</div>
              <div className="font-mono text-lg">**** **** **** 4582</div>
            </div>
            <div className="flex justify-between mt-4 text-white">
              <div>
                <div className="text-sm opacity-80">Card Holder</div>
                <div>John Doe</div>
              </div>
              <div>
                <div className="text-sm opacity-80">Expires</div>
                <div>{card.dueDate?.slice(3)}</div>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">{card.name}</div>
              <div className="flex space-x-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => {
                  const newIndex = activeCard === 0 ? creditCards.length - 1 : activeCard - 1
                  setActiveCard(newIndex)
                  setEditableCard(creditCards[newIndex])
                }}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => {
                  const newIndex = activeCard === creditCards.length - 1 ? 0 : activeCard + 1
                  setActiveCard(newIndex)
                  setEditableCard(creditCards[newIndex])
                }}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Balance</span>
                {isEditing ? (
                  <input
                    className="bg-transparent border-b w-20 text-right"
                    type="number"
                    value={card.amountOwed}
                    onChange={(e) => handleFieldChange("amountOwed", parseFloat(e.target.value))}
                  />
                ) : (
                  <span
                    className="font-medium cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    ${card.amountOwed.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span>Credit Limit</span>
                {isEditing ? (
                  <input
                    className="bg-transparent border-b w-20 text-right"
                    type="number"
                    value={card.totalBalance}
                    onChange={(e) => handleFieldChange("totalBalance", parseFloat(e.target.value))}
                  />
                ) : (
                  <span
                    className="font-medium cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    ${card.totalBalance.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span>Due Date</span>
                {isEditing ? (
                  <input
                    className="bg-transparent border-b w-24 text-right"
                    type="text"
                    value={card.dueDate}
                    onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                  />
                ) : (
                  <span
                    className="font-medium cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    {card.dueDate}
                  </span>
                )}
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
              {isEditing && (
                <Button size="sm" onClick={handleSave} className="mt-2">Save</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Utilization */}
      <Card className="min-h-[450px]">
        <CardHeader>
          <CardTitle>Credit Utilization</CardTitle>
          <CardDescription>Your current credit usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
      <Card className="min-h-[450px]">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Weekly Payment Planner</CardTitle>
            <CardDescription>Upcoming due dates and payment amounts</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={regeneratePaymentPlan}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">Payments based on $</span>
            <Input
              type="number"
              className="w-20 h-8 text-sm"
              value={weeklyBudget}
              onChange={(e) => setWeeklyBudget(parseFloat(e.target.value))}
            />
            <span className="text-xs text-muted-foreground">per week</span>
          </div>
          {paymentPlan.length === 0 ? (
            <div className="text-sm text-muted-foreground">No plan available.</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {paymentPlan.map((p, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="accent-emerald-500 h-4 w-4"
                      checked={!!paidStatus[index]}
                      onChange={() => togglePaid(index)}
                    />
                    <div>
                      <div className="font-medium">{p.paymentTo}</div>
                      <div className="text-xs text-muted-foreground">
                        Week: {new Date(p.week).toLocaleString("en-US", { month: "short", day: "2-digit" }).toUpperCase()} |
                        Due: {new Date(p.dueDate).toLocaleString("en-US", { month: "short", day: "2-digit" }).toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold ${paidStatus[index] ? "line-through text-muted-foreground" : ""}`}>
                    ${p.amountPaid}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
