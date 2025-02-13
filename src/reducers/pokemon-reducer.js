const limit = 20;

export const initialState = {
    pokemons: [],
    displayedPokemons: [],
    loading: false,
    hasMore: true,
    offset: limit,
    searchQuery: "",
    filterFavorites: false,
  };
  
  export const pokemonReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          ...state,
          pokemons: action.payload,
          displayedPokemons: action.payload.slice(0, limit),
          loading: false,
        };
  
        case "LOAD_MORE": {
          const morePokemons = state.filteredPokemons.slice(state.offset, state.offset + state.limit);
          return {
            ...state,
            displayedPokemons: [...state.displayedPokemons, ...morePokemons],
            offset: state.offset + state.limit,
            hasMore: state.offset + state.limit < state.filteredPokemons.length,
          };
        }
  
      case "SET_LOADING":
        return { ...state, loading: action.payload };
  
      case "SET_SEARCH_QUERY":
        return { ...state, searchQuery: action.payload };
  
      case "SET_FILTER_FAVORITES":
        return { ...state, filterFavorites: action.payload };
  
        case "FILTER_POKEMONS": {
          let filteredPokemons = state.pokemons;
    
          if (state.searchQuery) {
            filteredPokemons = filteredPokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
          }
    
          if (state.filterFavorites) {
            filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.is_favourite);
          }
    
          return {
            ...state,
            filteredPokemons, 
            displayedPokemons: filteredPokemons.slice(0, state.limit), 
            offset: state.limit, 
            hasMore: filteredPokemons.length > state.limit, 
          };
        }
  
      case "UPDATE_FAVORITES": {
        const updatedPokemons = state.pokemons.map((pokemon) =>
          pokemon.id === action.payload.id ? action.payload : pokemon
        );
  
        return {
          ...state,
          pokemons: updatedPokemons,
          displayedPokemons: state.displayedPokemons.map((pokemon) =>
            pokemon.id === action.payload.id ? action.payload : pokemon
          ),
        };
      }
  
      default:
        return state;
    }
  };



 
  