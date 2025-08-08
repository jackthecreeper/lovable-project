import { Card } from "@/components/ui/card";

interface CryptoData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const cryptoData: CryptoData[] = [
  { name: "BTC", symbol: "USDT", price: "117219.88", change: "+2.32%", isPositive: true },
  { name: "ETH", symbol: "USDT", price: "3869.16", change: "+8.91%", isPositive: true },
  { name: "XRP", symbol: "USDT", price: "3.215", change: "+8.31%", isPositive: true },
  { name: "DOGE", symbol: "USDT", price: "0.219669", change: "+7.72%", isPositive: true },
  { name: "ETC", symbol: "USDT", price: "21.2609", change: "+5.57%", isPositive: true },
  { name: "UNI", symbol: "USDT", price: "10.3759", change: "+7.23%", isPositive: true },
  { name: "BSV", symbol: "USDT", price: "26.2993", change: "+2.66%", isPositive: true },
  { name: "CORE", symbol: "USDT", price: "0.518817", change: "+4.99%", isPositive: true },
];

export const CryptoPriceTable = () => {
  return (
    <Card className="bg-gradient-card border-border shadow-glow-card">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4 text-crypto-muted text-sm font-medium">
          <div>Name</div>
          <div className="text-right">Last price</div>
          <div className="text-right">24h change</div>
        </div>
        <div className="space-y-3">
          {cryptoData.map((crypto) => (
            <div
              key={crypto.name}
              className="grid grid-cols-3 gap-4 py-3 border-b border-border last:border-b-0 hover:bg-crypto-card/50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-crypto-accent rounded-full flex items-center justify-center text-crypto-accent-foreground font-bold text-sm">
                  {crypto.name === "BTC" ? "₿" : 
                   crypto.name === "ETH" ? "Ξ" : 
                   crypto.name.charAt(0)}
                </div>
                <div>
                  <div className="text-foreground font-medium">{crypto.name}</div>
                  <div className="text-crypto-muted text-xs">{crypto.symbol}</div>
                </div>
              </div>
              <div className="text-right text-foreground font-mono">
                {crypto.price}
              </div>
              <div className={`text-right font-medium ${
                crypto.isPositive ? "text-crypto-success" : "text-crypto-danger"
              }`}>
                {crypto.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};