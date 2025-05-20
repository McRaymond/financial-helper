import { NextResponse } from "next/server"

// These stores must match the ones used in your dashboard and expenses routes
// You should extract these into a shared module to avoid duplication
const dashboardStore: Record<string, any> = global.dashboardStore || (global.dashboardStore = {})
const monthData: Map<string, any[]> = global.monthData || (global.monthData = new Map())

export async function GET() {
  const result: Record<string, any> = {}

  for (const month of Object.keys(dashboardStore)) {
    result[month] = {
      totalBalance: dashboardStore[month]?.totalBalance || 0,
      expenses: dashboardStore[month]?.expenses || 0,
      savings: dashboardStore[month]?.savings || 0,
      investments: dashboardStore[month]?.investments || 0,
    }
  }

  return NextResponse.json(result)
}
