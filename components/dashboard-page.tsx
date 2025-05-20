"use client"

import { useEffect, useState } from "react"
import { DollarSign, CreditCard, PiggyBank, TrendingUp, Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})
  const [showExpenses, setShowExpenses] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" })
  const [month, setMonth] = useState(() => format(new Date(), "MMMM"))

  useEffect(() => {
    fetch(`/api/dashboard?month=${month}`)
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data)
        setFormData(data)
      })

    fetch(`/api/expenses?month=${month}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
  }, [month])

  useEffect(() => {
    const total = expenses.reduce((acc, e) => acc + parseFloat(e.amount || 0), 0)
    const updated = { ...formData, expenses: total }
    setFormData(updated)
    fetch(`/api/dashboard?month=${month}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
    fetch(`/api/expenses?month=${month}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenses),
    })
  }, [expenses])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: parseFloat(value) }))
  }

  const handleSave = async () => {
    const res = await fetch(`/api/dashboard?month=${month}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    setDashboardData(data)
    setEditMode(false)
  }

  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) return
    const updatedExpenses = [...expenses, { ...newExpense, id: Date.now() }]
    setExpenses(updatedExpenses)
    setNewExpense({ name: "", amount: "" })
  }

  const handleRemoveExpense = (id) => {
    const updatedExpenses = expenses.filter(e => e.id !== id)
    setExpenses(updatedExpenses)
  }

  const handleMonthChange = (e) => {
    const newMonth = e.target.value
    if (newMonth !== month) {
      setMonth(newMonth)
    }
  }

  if (!dashboardData) return <div className="p-4">Loading dashboard...</div>

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <select value={month} onChange={handleMonthChange} className="border rounded px-2 py-1 text-sm">
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <Button onClick={() => (editMode ? handleSave() : setEditMode(true))}>
          {editMode ? "Save" : "Edit"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Balance", icon: DollarSign, key: "totalBalance", diff: "+2.5%" },
          { label: "Monthly Expenses", icon: CreditCard, key: "expenses", diff: "+10.1%" },
          { label: "Savings", icon: PiggyBank, key: "savings", diff: "+18.2%" },
          { label: "Investments", icon: TrendingUp, key: "investments", diff: "+4.3%" },
        ].map(({ label, icon: Icon, key, diff }) => (
          <Card key={key} onClick={() => key === "expenses" && setShowExpenses((prev) => !prev)} className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Input
                  type="number"
                  value={formData[key] ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : (
                <div className="text-2xl font-bold">
                  ${formData[key]?.toLocaleString()}
                </div>
              )}
              <p className="text-xs text-muted-foreground">{diff} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {showExpenses && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Expenses List</h2>
          <div className="space-y-2">
            {expenses.map((expense) => (
              <div key={expense.id} className="border p-2 rounded-md flex justify-between items-center">
                <span>{expense.name} - ${parseFloat(expense.amount).toFixed(2)}</span>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveExpense(expense.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Expense name"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <Button onClick={handleAddExpense}>Add</Button>
          </div>
        </div>
      )}
    </div>
  )
}
