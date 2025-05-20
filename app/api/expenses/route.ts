import { NextRequest, NextResponse } from "next/server"

let expenses = [
  { id: 1, name: "Groceries", amount: 120.45 },
  { id: 2, name: "Internet", amount: 60.0 },
  { id: 3, name: "Gas", amount: 45.2 },
  { id: 4, name: "Electricity", amount: 85.0 },
]

export async function GET() {
  return NextResponse.json(expenses)
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    expenses = data
    return NextResponse.json(expenses)
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 })
  }
}
