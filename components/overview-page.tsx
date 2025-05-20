"use client"

import { BudgetChart } from "@/components/budget-chart"
import { TransactionList } from "@/components/transaction-list"
import { FinancialTips } from "@/components/financial-tips"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OverviewPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Your financial summary for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BudgetChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionList />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Tips</CardTitle>
          <CardDescription>Personalized advice to improve your finances</CardDescription>
        </CardHeader>
        <CardContent>
          <FinancialTips />
        </CardContent>
      </Card>
    </>
  )
}
