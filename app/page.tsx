"use client"

import DashboardPage from "@/components/dashboard-page"
import OverviewPage from "@/components/overview-page"
import ExpensesPage from "@/components/expenses-page"
import BudgetPage from "@/components/budget-page"
import CreditCardsPage from "@/components/credit-cards-page"
import InsightsPage from "@/components/insights-page"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <DashboardPage />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OverviewPage />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <ExpensesPage />
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <BudgetPage />
        </TabsContent>

        <TabsContent value="credit-cards" className="space-y-4">
          <CreditCardsPage />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <InsightsPage />
        </TabsContent>
      </Tabs>
    </main>
  )
}
