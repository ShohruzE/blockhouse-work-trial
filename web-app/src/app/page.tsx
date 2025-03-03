import { Suspense } from "react";
import SearchBar from "@/components/search-bar";
import CryptoTracker from "@/components/crypto-tracker";
import LoadingSkeleton from "@/components/loading-skeleton";
import DataProvider from "@/components/DataProvider";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-2 py-8">
        <h1 className="text-3xl font-bold mb-4">Crypto Price Tracker</h1>
        <p className="text-slate-300">Displays live crypto data</p>
        <p className="text-slate-500 mb-8">By Shohruz Ernazarov</p>
        <SearchBar />
        <DataProvider>
          <Suspense fallback={<LoadingSkeleton />}>
            <CryptoTracker />
          </Suspense>
        </DataProvider>
      </div>
    </div>
  );
}
