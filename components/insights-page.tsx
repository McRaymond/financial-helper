"use client"

import { FinancialTips } from "@/components/financial-tips"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export default function InsightsPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Spending Insights</CardTitle>
            <CardDescription>Where your money is going</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="mb-2">Your top spending categories this month:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Housing: $1,500 (35.7%)</li>
                <li>Food: $850 (20.2%)</li>
                <li>Transportation: $400 (9.5%)</li>
                <li>Entertainment: $350 (8.3%)</li>
                <li>Utilities: $200 (4.8%)</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Detailed Analysis
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Saving Opportunities</CardTitle>
            <CardDescription>Ways to reduce expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div className="p-2 bg-muted rounded-lg">
                <p className="font-medium">Food expenses are 6.3% over budget</p>
                <p className="text-muted-foreground">Consider meal planning to reduce food costs.</p>
              </div>
              <div className="p-2 bg-muted rounded-lg">
                <p className="font-medium">Entertainment spending increased by 15%</p>
                <p className="text-muted-foreground">Look for free or low-cost alternatives.</p>
              </div>
              <div className="p-2 bg-muted rounded-lg">
                <p className="font-medium">Subscription services: $85/month</p>
                <p className="text-muted-foreground">Review and cancel unused subscriptions.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Get More Tips
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Financial Health Score</CardTitle>
            <CardDescription>Your overall financial wellness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full border-8 border-emerald-500" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                  82
                </div>
              </div>
              <div className="text-sm font-medium text-emerald-500">Good</div>
              <div className="text-xs text-muted-foreground text-center">
                Your financial health is above average. Keep up the good work!
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Improve Score
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Tailored advice based on your financial habits</CardDescription>
        </CardHeader>
        <CardContent>
          <FinancialTips />
        </CardContent>
      </Card>
    </>
  )
}
