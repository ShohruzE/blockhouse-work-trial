---
sidebar_position: 4
---

# State Management

This document explains the state management approach used in the Crypto Price Tracker application.

There are two different state options used. **React Query** and React's **Context** API. The main data for the cryptocurrency API is fetched and managed by React Query. However, the Context API is also used for managing the search bar state to filter through the existing data.

## Why React Query?

For this application, I chose **React Query** as our primary state management solution. Here's why:

### Key Advantages

1. **Purpose-built for API data**: React Query is specifically designed for managing server state, which is perfect for a Next.js application.

2. **Automatic caching**: It provides sophisticated caching mechanisms out of the box, reducing unnecessary API calls and improving performance.

3. **Loading and error states**: React Query automatically tracks loading, error, and success states, making it easy to implement loading indicators and error handling.

4. **Refetching strategies**: It offers flexible refetching options including:

   - Refetch on window focus
   - Refetch after network reconnection
   - Configurable stale times
   - Manual refetching

5. **Pagination and infinite scrolling**: Built-in support for these features (which can be implemented for the future).

For a more in-depth explanation on React Query fetching and its state, read this page on [API Integration](./api-integration.md).

## Local UI State

In addition to React Query for server state, I use React's built-in context API for handling the search query state.

```jsx title="src/context/SearchContext.tsx"
"use client";

import { createContext, useContext, useState } from "react";

type SearchContextType = {
  searchQuery: string,
  setSearchQuery: (query: string) => void,
};

const SearchContext =
  createContext <
  SearchContextType >
  {
    searchQuery: "",
    setSearchQuery: () => {},
  };

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
```

This is used for the search functionality, which filters the cached API data on the client side without making additional API requests.

Once the data has been loaded, we can use client-side filtering with the native JS `.filter()` function to only return data that match the search query by the _name_ or _ticker_.

```jsx title="src/components/crypto-tracker.tsx"
const filteredData = data?.filter(
  (crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
);

if (!filteredData?.length) {
  return (
    <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
      <p className="text-red-300">No results found matching "{searchQuery}"</p>
    </div>
  );
}
```

If there happens to be no matching name or symbol, we display a helpful and styled error message to the user.

### Why Context API for Search Bar State?

The Context API was chosen to manage the search bar state for the following reasons:

1. **Encapsulation**: By encapsulating the search bar state into a separate client component, we ensure that the search functionality is modular and self-contained.

2. **Client-Side State Management**: Using the Context API allows us to manage the search query state on the client side without triggering additional data fetches. This is crucial for performance, as it avoids unnecessary API calls and leverages the already cached data.

3. **Separation of Concerns**: The Context API helps in separating the search logic from the main data fetching logic, making the codebase cleaner and easier to maintain.

4. **Reusability**: The search state can be easily accessed and modified by any component within the provider, promoting reusability and consistency across the application.
