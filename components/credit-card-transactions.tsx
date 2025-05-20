import { ShoppingBag, Coffee, Film, Utensils, Plane, Smartphone, ShoppingCart, Home } from "lucide-react"

export function CreditCardTransactions() {
  const transactions = [
    {
      id: 1,
      description: "Amazon.com",
      amount: 87.32,
      date: "May 15, 2025",
      card: "Chase Sapphire",
      category: "Shopping",
      icon: ShoppingBag,
    },
    {
      id: 2,
      description: "Starbucks",
      amount: 5.45,
      date: "May 14, 2025",
      card: "Amex Gold",
      category: "Food & Drink",
      icon: Coffee,
    },
    {
      id: 3,
      description: "Netflix",
      amount: 15.99,
      date: "May 12, 2025",
      card: "Citi Double Cash",
      category: "Entertainment",
      icon: Film,
    },
    {
      id: 4,
      description: "Cheesecake Factory",
      amount: 68.25,
      date: "May 10, 2025",
      card: "Amex Gold",
      category: "Dining",
      icon: Utensils,
    },
    {
      id: 5,
      description: "United Airlines",
      amount: 432.87,
      date: "May 8, 2025",
      card: "Chase Sapphire",
      category: "Travel",
      icon: Plane,
    },
    {
      id: 6,
      description: "AT&T Wireless",
      amount: 95.0,
      date: "May 5, 2025",
      card: "Citi Double Cash",
      category: "Bills & Utilities",
      icon: Smartphone,
    },
    {
      id: 7,
      description: "Target",
      amount: 124.32,
      date: "May 3, 2025",
      card: "Amex Gold",
      category: "Shopping",
      icon: ShoppingCart,
    },
    {
      id: 8,
      description: "Home Depot",
      amount: 87.45,
      date: "May 1, 2025",
      card: "Chase Sapphire",
      category: "Home",
      icon: Home,
    },
  ]

  const getCardColor = (card: string) => {
    switch (card) {
      case "Chase Sapphire":
        return "bg-blue-100 text-blue-700"
      case "Citi Double Cash":
        return "bg-slate-100 text-slate-700"
      case "Amex Gold":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => {
        const Icon = transaction.icon
        const cardColor = getCardColor(transaction.card)

        return (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-100">
                <Icon className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cardColor}`}>{transaction.card}</span>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium">
              {transaction.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
