import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CryptoCardProps {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
  };
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const priceChangeIsPositive = crypto.price_change_percentage_24h >= 0;

  // Format numbers with commas and proper decimal places
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else {
      return formatCurrency(value);
    }
  };

  return (
    <Card className="overflow-hidden border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-700">
            <Image
              src={crypto.image || "/placeholder.svg"}
              alt={crypto.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{crypto.name}</h3>
            <p className="text-slate-400 uppercase">{crypto.symbol}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400">Current Price</p>
            <p className="text-white text-2xl font-bold">
              {formatCurrency(crypto.current_price)}
            </p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-400">24h Change</p>
              <div
                className={`flex items-center ${
                  priceChangeIsPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {priceChangeIsPositive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-400">Market Cap</p>
              <p className="text-white font-medium">
                {formatLargeNumber(crypto.market_cap)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-400">Volume (24h)</p>
            <p className="text-white font-medium">
              {formatLargeNumber(crypto.total_volume)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
