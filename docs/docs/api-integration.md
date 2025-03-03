---
sidebar_position: 3
---

# API Integration

This page explains how the Crypto Price Tracker integrates with the CoinGecko API to fetch and display cryptocurrency data.

## API Overview

The application uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) to retrieve cryptocurrency market data. CoinGecko offers a free tier that allows up to 10-30 requests per minute, which is sufficient for our application's needs.

## Implementation Details

### React Query

#### Initialize config

    To get started with React Query, you must initalize it and **optionally** pass in a ```defaultOptions``` object. Here we initalize some properties like ```staleTime``` and ```cacheTime``` to set the amount of time that the data we fetch through React Query is considered not fresh, and the amount of time that we do not perform additional requests, respectively, for **all** API calls.

    We wrap the client with React's ```useState``` hook to ensure the state is preserved throughout the application to be subsequently passed into the ```QueryClientProvider``` component.

    ```jsx title="src/app/providers.tsx"
    "use client";

    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
    import { SearchProvider } from "@/context/SearchContext";
    import { useState } from "react";

    export default function Providers({ children }: { children: React.ReactNode }) {
        const [queryClient] = useState(
            () =>
            new QueryClient({
                defaultOptions: {
                // default options for all queries
                queries: {
                    staleTime: 30 * 1000, // 30 seconds
                    cacheTime: 30 * 1000, // 30 seconds
                    refetchOnWindowFocus: true,
                },
                },
            })
        );

        return (
            <QueryClientProvider client={queryClient}>
                <SearchProvider>{children}</SearchProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            );
    }
    ```

    The ```SearchProvider``` component is for the search bar Context state, which is explained **[here](./state-management)**.

#### Data Prefetching

    We prefetch the data using ```prefetchQuery``` on a new ```QueryClient```, which we dehydrate to get rid of the client once the data is fetched. This lets us fetch the data on the server, and then display it on the client-side.


    ```jsx title="src/components/DataProvider.tsx"
    import { QueryClient, Hydrate, dehydrate } from "@tanstack/react-query";
    import { getCryptoData } from "@/lib/api";

    export default async function DataProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const queryClient = new QueryClient();

        await queryClient.prefetchQuery({
            queryKey: ["cryptoData"],
            queryFn: getCryptoData,
        });

        return <Hydrate state={dehydrate(queryClient)}>{children}</Hydrate>;
    }
    ```

    Thus, for any subsequent re-fetches, we render it in the ```crypto-tracker.jsx``` file, while also allowing for error handling and loading UI using React's ```Suspense```.

    ```jsx title="src/app/page.tsx"
        <DataProvider>
          <Suspense fallback={<LoadingSkeleton />}>
            <CryptoTracker />
          </Suspense>
        </DataProvider>
    ```

    ```jsx title="src/components/crypto-tracker.tsx"
    const { data, status, error, isFetching } = useQuery({
        queryKey: ["cryptoData"],
        queryFn: getCryptoData,
        suspense: true,
    });
    ```

    To refresh the data, it is encapsulated in a separate client component using ```.invalidateQueries()```. We pass the ```"cryptoData"``` key to mark the data as stale, thus triggering a refresh as per our config above.

    ```jsx title="src/components/refresh-button.tsx"
    queryClient.invalidateQueries(["cryptoData"]);
    ```

### API Service

The API integration is encapsulated in an API service module (`src/lib/api.ts`), which contains the function and relevant type to fetch the cryptocurrency data.

```javascript title="src/lib/api.ts"
// Default cryptocurrencies to display
const DEFAULT_CRYPTOS = ["bitcoin", "ethereum", "ripple", "cardano", "solana"];

export type CryptoData = {
  id: string,
  name: string,
  symbol: string,
  current_price: number,
  image: string,
  price_change_percentage_24h: number,
  market_cap: number,
  total_volume: number,
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
```

## API Response Example

Here's an example of the data structure returned by the CoinGecko API:

```json
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    "current_price": 94159,
    "market_cap": 1866854981885,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 1866854981885,
    "total_volume": 56927228628,
    "high_24h": 94537,
    "low_24h": 85075,
    "price_change_24h": 8690.28,
    "price_change_percentage_24h": 10.16774,
    "market_cap_change_24h": 172117553711,
    "market_cap_change_percentage_24h": 10.156,
    "circulating_supply": 19831359,
    "total_supply": 19831359,
    "max_supply": 21000000,
    "ath": 108786,
    "ath_change_percentage": -13.34001,
    "ath_date": "2025-01-20T09:11:54.494Z",
    "atl": 67.81,
    "atl_change_percentage": 138928.04835,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2025-03-02T21:23:16.287Z",
    "price_change_percentage_24h_in_currency": 10.167735340441936
  },
  ...
  ...
  ...
]
```

### API Endpoints Used

The application uses the following CoinGecko API endpoint:

1. **`/coins/markets`** - Used to fetch a list of cryptocurrencies with price, market cap, and volume information.

   - Parameters:
     - `vs_currency`: 'usd' (the currency to display prices in)
     - `order`: 'market_cap_desc' (sort by market cap in descending order)
     - `per_page`: Number of results to return (default: 10)
     - `page`: Page number for pagination
     - `sparkline`: 'false' (we don't need sparkline data)
     - `price_change_percentage`: '24h' (include 24h price change percentage)

### Data Transformation

The raw API data is used as-is without significant transformation, as the CoinGecko API returns data in a format that's already suitable for our UI components. The main transformations include:

- Filtering coins based on user search input
- Formatting price and percentage values for display

  ```jsx title="src/components/crypto-card.tsx"
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
  ```

### Error Handling

If any failure happens in the fetch, a helpful error UI is shown to the user.

```jsx title="src/components/crypto-tracker.jsx"
if (status === "error") {
  return (
    <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
      <p className="text-red-300">
        Error: {error instanceof Error ? error.message : "Failed to fetch data"}
      </p>
    </div>
  );
}
```

### Rate Limiting Considerations

To avoid hitting CoinGecko's rate limits:

1. Data is cached using React Query
2. Stale time is set to 30 seconds to prevent unnecessary refetches
3. Manual refresh is provided through a button rather than automatic polling

## Testing the API

During development, you can test the API using:

1. The browser's Network tab to monitor requests and responses
2. React Query DevTools to observe cache behavior and request states, which in particular proved very helpful for me.
3. Manual testing with the Refresh button to verify data updates
