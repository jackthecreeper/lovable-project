import { Card } from "@/components/ui/card";

interface CryptoCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

export const CryptoCard = ({ icon, title, subtitle, onClick }: CryptoCardProps) => {
  return (
    <Card 
      className="bg-gradient-card border-border hover:border-crypto-accent transition-all duration-300 cursor-pointer shadow-glow-card hover:shadow-glow-primary p-6 text-center"
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src={icon} alt={title} className="w-8 h-8" />
        </div>
        <h3 className="text-foreground font-medium">{title}</h3>
        {subtitle && (
          <p className="text-crypto-muted text-sm">{subtitle}</p>
        )}
      </div>
    </Card>
  );
};