import { CryptoCard } from "./CryptoCard";
import { Grid3X3, Shield, Bot, Headphones, FileText, ArrowUpDown } from "lucide-react";

const features = [
  {
    icon: Grid3X3,
    title: "ICO subscription",
  },
  {
    icon: Shield,
    title: "Verify",
  },
  {
    icon: Bot,
    title: "AI quantification",
  },
  {
    icon: Headphones,
    title: "Online customer service",
  },
  {
    icon: FileText,
    title: "White paper",
  },
  {
    icon: ArrowUpDown,
    title: "Withdrawal",
  },
];

export const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="bg-gradient-card border border-border hover:border-crypto-accent transition-all duration-300 cursor-pointer shadow-glow-card hover:shadow-glow-primary p-6 text-center rounded-lg"
            onClick={() => console.log(`Clicked ${feature.title}`)}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <Icon className="w-8 h-8 text-crypto-accent" />
              </div>
              <h3 className="text-foreground font-medium">{feature.title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};