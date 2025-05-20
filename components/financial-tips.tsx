import { Lightbulb, TrendingUp, PiggyBank, CreditCard, AlertCircle } from "lucide-react"

export function FinancialTips() {
  const tips = [
    {
      id: 1,
      title: "Build an Emergency Fund",
      description: "Aim to save 3-6 months of expenses in an easily accessible account.",
      icon: AlertCircle,
    },
    {
      id: 2,
      title: "Follow the 50/30/20 Rule",
      description: "Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.",
      icon: PiggyBank,
    },
    {
      id: 3,
      title: "Pay Off High-Interest Debt",
      description: "Prioritize paying off credit cards and loans with the highest interest rates first.",
      icon: CreditCard,
    },
    {
      id: 4,
      title: "Automate Your Savings",
      description: "Set up automatic transfers to your savings account on payday.",
      icon: Lightbulb,
    },
    {
      id: 5,
      title: "Invest for Retirement",
      description: "Contribute to retirement accounts to benefit from compound growth.",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-4">
      {tips.map((tip) => {
        const Icon = tip.icon
        return (
          <div key={tip.id} className="flex gap-4 p-3 rounded-lg border">
            <div className="mt-0.5">
              <Icon className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-medium">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
