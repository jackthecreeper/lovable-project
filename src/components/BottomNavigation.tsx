import { Home, TrendingUp, BarChart3, CreditCard, Users, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: TrendingUp, label: "Quotes" },
  { icon: BarChart3, label: "Coins" },
  { icon: CreditCard, label: "Trading" },
  { icon: Users, label: "Community" },
  { icon: User, label: "Mine" },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-crypto-card border-t border-border">
      <div className="grid grid-cols-6 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                item.active
                  ? "text-crypto-accent"
                  : "text-crypto-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};