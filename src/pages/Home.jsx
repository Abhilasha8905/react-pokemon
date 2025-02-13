import { useEffect, useReducer, useCallback, useMemo } from "react";
import Listing from "../components/Listing";
import Search from "../components/Search";
import { initialState, pokemonReducer } from "../reducers/pokemon-reducer";

const Home = () => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const fetchPokemons = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("https://express-pokemon-api.onrender.com/api/pokemon");
      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data.data });
    } catch (error) {
      console.error("Failed to fetch Pokémon", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      dispatch({ type: "FILTER_POKEMONS" });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [state.searchQuery, state.filterFavorites, state.pokemons]);

  const setSearchQuery = useCallback(
    (query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    [dispatch]
  );

  const setFilterFavorites = useCallback(
    (filter) => dispatch({ type: "SET_FILTER_FAVORITES", payload: filter }),
    [dispatch]
  );

  const loadMore = useCallback(() => dispatch({ type: "LOAD_MORE" }), [dispatch]);

  const updateFavorites = useCallback(
    (updatedPokemon) => dispatch({ type: "UPDATE_FAVORITES", payload: updatedPokemon }),
    [dispatch]
  );

  const listingProps = useMemo(
    () => ({
      pokemons: state.displayedPokemons,
      loadMore,
      hasMore: state.hasMore,
      loading: state.loading,
      updateFavorites,
    }),
    [state.displayedPokemons, state.hasMore, state.loading, loadMore, updateFavorites]
  );

  return (
    <>
      <Search setSearchQuery={setSearchQuery} setFilterFavorites={setFilterFavorites} />
      <Listing {...listingProps} />
    </>
  );
};

export default Home;
