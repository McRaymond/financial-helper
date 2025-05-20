import { NextRequest, NextResponse } from "next/server"

const monthData: Map<string, any[]> = global.monthData || (global.monthData = new Map())

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const month = searchParams.get("month") || "default"
  const data = monthData.get(month) || []
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const month = searchParams.get("month") || "default"
  try {
    const updatedExpenses = await req.json()
    if (!Array.isArray(updatedExpenses)) {
      return NextResponse.json({ error: "Invalid expense format" }, { status: 400 })
    }
    monthData.set(month, updatedExpenses)
    return NextResponse.json(updatedExpenses)
  } catch (err) {
    return NextResponse.json({ error: "Failed to parse JSON" }, { status: 500 })
  }
}
