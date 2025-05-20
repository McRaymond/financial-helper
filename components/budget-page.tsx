"use client"

import { BudgetChart } from "@/components/budget-chart"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function BudgetPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Budget Allocation</CardTitle>
          <CardDescription>How your money is distributed</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetChart />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Manage your budget categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Housing", spent: 1500, total: 1500, percent: 100, color: "bg-emerald-500" },
                { label: "Food", spent: 850, total: 800, percent: 106, color: "bg-red-500" },
                { label: "Transportation", spent: 400, total: 500, percent: 80, color: "bg-emerald-500" },
                { label: "Entertainment", spent: 350, total: 300, percent: 116, color: "bg-red-500" },
                { label: "Utilities", spent: 200, total: 250, percent: 80, color: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">
                      ${item.spent} / ${item.total}
                    </div>
                  </div>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Adjust Budget
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>Track your progress towards financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Emergency Fund", percent: 80, label: "$8,000 / $10,000" },
                { name: "Vacation", percent: 50, label: "$2,500 / $5,000" },
                { name: "New Car", percent: 48, label: "$12,000 / $25,000" },
              ].map((goal) => (
                <div key={goal.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{goal.name}</div>
                    <div className="text-sm text-muted-foreground">{goal.label}</div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${goal.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Goal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
