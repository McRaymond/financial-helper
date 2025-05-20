import { NextRequest, NextResponse } from "next/server"

let dashboardData = {
  totalBalance: 12580.0,
  expenses: 4205.32,
  savings: 8374.68,
  investments: 6147.12,
}

export async function GET() {
  return NextResponse.json(dashboardData)
}

export async function POST(req: NextRequest) {
  try {
    const updated = await req.json()
    dashboardData = { ...dashboardData, ...updated }
    return NextResponse.json(dashboardData)
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
