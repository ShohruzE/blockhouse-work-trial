"use client";

import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefreshButton() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    console.log("Refreshing data...");
    queryClient.invalidateQueries(["cryptoData"]);
    console.log("Data refreshed!");
  };

  return (
    <Button
      onClick={handleRefresh}
      className="cursor-pointer bg-blue-700 hover:bg-blue-700/50 transition-colors"
    >
      <RefreshCw size={16} className="" />
      Refresh
    </Button>
  );
}
