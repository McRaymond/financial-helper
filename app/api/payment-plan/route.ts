import { NextRequest, NextResponse } from "next/server"

function getNextTuesday(startDate: Date) {
  const currentWeekday = startDate.getDay()
  const daysAhead = (2 - currentWeekday + 7) % 7
  return new Date(startDate.getTime() + daysAhead * 86400000)
}

function parseDate(dateStr: string) {
  const parsed = new Date(dateStr)
  return isNaN(parsed.getTime()) ? new Date("2100-01-01") : parsed
}

function generatePaymentPlan(cards: any[], weeklyBudget: number, startDate = new Date()) {
  const plan = []
  let remainingDebt = cards.reduce((sum, c) => sum + c.amountOwed, 0)
  let paymentDate = getNextTuesday(startDate)
  let rowNumber = 1
  let weekCount = 0
  const MAX_WEEKS = 5200

  cards.forEach(card => {
    card.dueDate = parseDate(card.dueDate)
  })

  while (remainingDebt > 0 && weekCount < MAX_WEEKS) {
    let budget = weeklyBudget
    let paidThisWeek = 0

    while (budget > 0) {
      const card = cards
        .filter(c => c.amountOwed > 0)
        .sort((a, b) => Math.abs(a.dueDate.getTime() - paymentDate.getTime()) - Math.abs(b.dueDate.getTime() - paymentDate.getTime()))[0]

      if (!card) return plan

      const payment = Math.min(budget, card.amountOwed)

      plan.push({
        row: rowNumber,
        week: paymentDate.toISOString().split("T")[0],
        paymentTo: card.name,
        amountPaid: +payment.toFixed(2),
        remainingBudget: +(budget - payment).toFixed(2),
        dueDate: card.dueDate.toISOString().split("T")[0],
        totalRemainingDebt: +(remainingDebt - payment).toFixed(2),
      })

      card.amountOwed -= payment
      remainingDebt -= payment
      budget -= payment
      paidThisWeek += payment
      rowNumber++

      if (remainingDebt <= 0) return plan
    }

    if (paidThisWeek === 0) return plan
    paymentDate = new Date(paymentDate.getTime() + 7 * 86400000)
    weekCount++
  }

  return plan
}

export async function POST(req: NextRequest) {
  try {
    const { cards, weeklyBudget } = await req.json()
    if (!Array.isArray(cards) || typeof weeklyBudget !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const plan = generatePaymentPlan(cards, weeklyBudget)
    return NextResponse.json(plan)
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
