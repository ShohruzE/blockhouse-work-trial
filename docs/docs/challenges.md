---
sidebar_position: 5
---

# Challenges & Solutions

This was my first time using React Query ever, so most of my troubles lied around my lack of knowledge with the library, as well as ensuring Next.js server-side features were still being utilized.

## State Management Complexity

### Challenge

Managing complex application state, including API data, UI state, and user interactions.

### Solution

1. **React Query for Server State**: Used React Query for all API-related state.
2. **Local State for UI Elements**: Used useState for UI-specific state.
3. **Component Composition**: Broke down complex components into smaller, focused ones.

## React Query with Next.js

### Challenge

Using React Query for the first time, especially with Next.js, to ensure that its server-side capabilities were utilized effectively.

### Solution

1. **Server-Side Rendering (SSR)**: Implemented React Query's Hydrate component to manage server-side data fetching and hydration.
2. **Best Practices**: Followed best practices for integrating React Query with Next.js, ensuring efficient data fetching and caching.
3. **Learning Curve**: Spent time understanding React Query's documentation and examples.

## Managing Local Search Query State

### Challenge

Initially used `searchParams` from Next.js to manage the search query state, which proved to be slow and caused rendering issues.

### Solution

1. **Context API**: Switched to using React's Context API to manage the search query state locally.
2. **Performance Improvement**: This change improved performance by avoiding unnecessary re-renders and leveraging client-side state management.
3. **Encapsulation**: Encapsulated the search bar state into a separate client component, ensuring modularity and better performance.

## Future Improvements

1. **Implement Pagination**: Add pagination for viewing more cryptocurrencies
2. **Advanced Filtering**: Add filtering by market cap, price change, etc.
3. **Authentication**: Allow users to create an account and have user-specific features with a DB
4. **Favorite Cryptos**: Allow users to mark favorites (with a DB implementation)
5. **Price Alerts**: Implement notifications for price changes
6. **Historical Data Charts**: Add visual charts for price history using some chart library.
7. **Dark Mode**: Add theme support with dark/light modes
