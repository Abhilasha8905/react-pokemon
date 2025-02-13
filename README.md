# Pokemon Listing App

## Overview
This project is a React-based web application that displays a list of Pokémon fetched from an API. It features infinite scrolling, search functionality, and the ability to mark Pokémon as favorites. The application uses `useReducer`, `useEffect`, `useCallback`, and `useMemo` for optimized state management and performance.

## Features
- **Infinite Scrolling**: Load more Pokémon dynamically as the user scrolls.
- **Search Functionality**: Filter Pokémon based on their names. (debounced search)
- **Favorite Toggle**: Mark Pokémon as favorites and filter to view only favorites.
- **Optimized Performance**: Utilizes `useReducer` for state management and `useCallback`/`useMemo` to prevent unnecessary re-renders.

## Tech Stack
- **Frontend**: React, React Hooks (useReducer, useEffect, useCallback, useMemo)
- **Styling**: CSS
- **Icons**: React Icons
- **API**: [Express Pokémon API](https://express-pokemon-api.onrender.com)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Abhilasha8905/react-pokemon.git
cd react-pokemon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://127.0.0.1:5173/`.

## How It Works
1. **Fetching Data:** Upon loading, the app fetches Pokémon data and stores it in the state.
2. **Infinite Scroll:** The `Listing` component loads more Pokémon when the user scrolls down.
3. **Search & Filter:** The `Search` component filters Pokémon by name and favorites.
4. **Favorite Toggle:** Clicking the heart icon toggles a Pokémon as a favorite and updates the backend.

# react-pokemon
