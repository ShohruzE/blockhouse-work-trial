"use client";

import { useSearch } from "@/context/SearchContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import RefreshButton from "@/components/refresh-button";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search
          className="absolute left-2 top-1/4 transform -translate-y-1/2 text-slate-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-8 bg-slate-800 border-slate-700 text-white"
        />
      </div>
      <RefreshButton />
    </div>
  );
}
