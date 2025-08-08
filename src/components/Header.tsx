import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-crypto-bg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-crypto-accent-foreground font-bold">B</span>
            </div>
            <span className="text-foreground font-bold text-xl">BVOXUS</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-crypto-muted hover:text-foreground">
              Home
            </Button>
            <Button variant="outline" className="border-crypto-accent text-crypto-accent hover:bg-crypto-accent hover:text-crypto-accent-foreground">
              English
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};