// Default cryptocurrencies to display
const DEFAULT_CRYPTOS = ["bitcoin", "ethereum", "ripple", "cardano", "solana"];

export type CryptoData = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
};

export async function getCryptoData(): Promise<CryptoData[]> {
  // Simulate a slow loading time to show loading skeleton
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${DEFAULT_CRYPTOS.join(
      ","
    )}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch crypto data");
  }

  return response.json();
}
