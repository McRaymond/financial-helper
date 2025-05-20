import { NextRequest, NextResponse } from "next/server"

const dashboardStore: Record<string, any> = global.dashboardStore || (global.dashboardStore = {})

export async function GET(req: NextRequest) {
  const month = req.nextUrl.searchParams.get("month") || "default"
  if (!dashboardStore[month]) {
    dashboardStore[month] = {
      totalBalance: 0,
      expenses: 0,
      savings: 0,
      investments: 0,
    }
  }
  return NextResponse.json(dashboardStore[month])
}

export async function POST(req: NextRequest) {
  const month = req.nextUrl.searchParams.get("month") || "default"
  const body = await req.json()
  dashboardStore[month] = body
  return NextResponse.json(dashboardStore[month])
}
