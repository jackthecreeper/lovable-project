import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { CryptoPriceTable } from "@/components/CryptoPriceTable";
import { FeatureGrid } from "@/components/FeatureGrid";
import heroImage from "@/assets/crypto-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-crypto-bg">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-crypto-bg/60" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Invest in your future
              </h1>
              <p className="text-crypto-muted text-sm md:text-base">
                Grow your portfolio in minutes for
              </p>
              <p className="text-crypto-muted text-sm md:text-base">
                Start trading crypto with just $100
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-6">
        <FeatureGrid />
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-card p-4 rounded-lg border border-border text-center">
            <div className="text-crypto-success text-lg font-bold">117219.88</div>
            <div className="text-crypto-muted text-xs">BTC/USDT</div>
            <div className="text-crypto-success text-xs">+2.32%</div>
          </div>
          <div className="bg-gradient-card p-4 rounded-lg border border-border text-center">
            <div className="text-crypto-success text-lg font-bold">3869.16</div>
            <div className="text-crypto-muted text-xs">ETH/USDT</div>
            <div className="text-crypto-success text-xs">+8.91%</div>
          </div>
          <div className="bg-gradient-card p-4 rounded-lg border border-border text-center">
            <div className="text-crypto-success text-lg font-bold">3.215</div>
            <div className="text-crypto-muted text-xs">XRP/USDT</div>
            <div className="text-crypto-success text-xs">+8.31%</div>
          </div>
        </div>
      </div>

      {/* Price Table */}
      <div className="container mx-auto px-4 pb-20">
        <CryptoPriceTable />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
