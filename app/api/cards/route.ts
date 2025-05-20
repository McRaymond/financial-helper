import { NextRequest, NextResponse } from "next/server"

let creditCards = [
  {
    name: "TD Bank",
    amountOwed: 127.38,
    totalBalance: 1300,
    dueDate: "01/06/2025",
    percentUsed: 10,
    totalUsage: 26,
    rewards: null,
  },
  {
    name: "American Express",
    amountOwed: 1741.75,
    totalBalance: 8000,
    dueDate: "16/05/2025",
    percentUsed: 22,
    totalUsage: 26,
    rewards: "58,240 pts ($728 travel)",
  },
  {
    name: "Chase",
    amountOwed: 1699.96,
    totalBalance: 4000,
    dueDate: "03/06/2025",
    percentUsed: 42,
    totalUsage: 26,
    rewards: "$124.50 (statement credit)",
  },
  {
    name: "Capital One",
    amountOwed: 1006.94,
    totalBalance: 4500,
    dueDate: "27/05/2025",
    percentUsed: 22,
    totalUsage: 26,
    rewards: "42,850 pts ($428 travel)",
  },
]

export async function GET() {
  return NextResponse.json(creditCards)
}

export async function PUT(req: NextRequest) {
  try {
    const updatedCard = await req.json()
    creditCards = creditCards.map((card) =>
      card.name === updatedCard.name ? { ...card, ...updatedCard } : card
    )
    return NextResponse.json({ success: true, updated: updatedCard })
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 })
  }
}
