"use client"

import { ExpenseForm } from "@/components/expense-form"
import { TransactionList } from "@/components/transaction-list"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ExpensesPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
          <CardDescription>Record your latest spending</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>Your spending over time</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionList />
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Expenses
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
