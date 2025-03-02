"use client";

import { useSearch } from "@/context/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CryptoCard from "@/components/crypto-card";
import LoadingSkeleton from "@/components/loading-skeleton";
import { getCryptoData } from "@/lib/api";

export default function CryptoTracker() {
  const { searchQuery } = useSearch();

  const { data, status, error, isFetching } = useQuery({
    queryKey: ["cryptoData"],
    queryFn: getCryptoData,
    suspense: true,
  });

  console.log(data);

  if (isFetching) return <LoadingSkeleton />;
  if (status === "error") {
    return (
      <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
        <p className="text-red-300">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to fetch data"}
        </p>
      </div>
    );
  }

  const filteredData = data?.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!filteredData?.length) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
        <p className="text-red-300">
          No results found matching "{searchQuery}"
        </p>
      </div>
    );
  }
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredData.map((crypto) => (
        <motion.div key={crypto.id} variants={cardVariants}>
          <CryptoCard crypto={crypto} />
        </motion.div>
      ))}
    </motion.div>
  );
}
