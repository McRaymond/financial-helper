import { CreditCard, ShoppingBag, Coffee, Home, Car, Film, Utensils } from "lucide-react"

export function TransactionList() {
  const transactions = [
    {
      id: 1,
      description: "Rent Payment",
      amount: -1500,
      date: "May 1, 2025",
      category: "Housing",
      icon: Home,
    },
    {
      id: 2,
      description: "Grocery Store",
      amount: -127.42,
      date: "May 3, 2025",
      category: "Food",
      icon: ShoppingBag,
    },
    {
      id: 3,
      description: "Salary Deposit",
      amount: 3200,
      date: "May 5, 2025",
      category: "Income",
      icon: CreditCard,
    },
    {
      id: 4,
      description: "Coffee Shop",
      amount: -4.5,
      date: "May 6, 2025",
      category: "Food",
      icon: Coffee,
    },
    {
      id: 5,
      description: "Gas Station",
      amount: -45.23,
      date: "May 8, 2025",
      category: "Transportation",
      icon: Car,
    },
    {
      id: 6,
      description: "Movie Tickets",
      amount: -24.99,
      date: "May 10, 2025",
      category: "Entertainment",
      icon: Film,
    },
    {
      id: 7,
      description: "Restaurant",
      amount: -68.5,
      date: "May 12, 2025",
      category: "Food",
      icon: Utensils,
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => {
        const Icon = transaction.icon
        return (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${transaction.amount > 0 ? "bg-emerald-100" : "bg-gray-100"}`}>
                <Icon className={`h-4 w-4 ${transaction.amount > 0 ? "text-emerald-500" : "text-gray-500"}`} />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
            <div className={`text-sm font-medium ${transaction.amount > 0 ? "text-emerald-500" : ""}`}>
              {transaction.amount > 0 ? "+" : ""}
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
