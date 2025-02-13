import { useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "../styles/listing.css";
import Modal from "../components/Modal";
import PokemonCard from "./PokemonCard"; // Import new component

const Listing = ({ pokemons, loadMore, hasMore, loading, updateFavorites }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleDetailsPage = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const handleFavoriteToggle = (pokemon) => {
    const updatedPokemon = { ...pokemon, is_favourite: !pokemon.is_favourite }; // Toggle favorite

    fetch(`https://express-pokemon-api.onrender.com/api/pokemon/favourite/${pokemon.id}`, {
      method: updatedPokemon.is_favourite ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status?.message === "SUCCESS") {
          updateFavorites(updatedPokemon);
        } else {
          console.error("Failed to update favorite status");
        }
      })
      .catch((error) => {
        console.error("Error updating favorite status:", error);
      });
  };

  return (
    <section className="listing-main">
      <div className="listing">
        <div className="listing-section">
          <div className="listing-div">
            {loading && !pokemons.length ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p>Loading Pokémon...</p>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={pokemons.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<div className="loading-card">Loading more Pokémon...</div>}
                endMessage={<p className="end-message">No more Pokémon to load.</p>}
                className="listing-div"
                scrollThreshold={0.8}
              >
                {pokemons?.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    handleFavoriteToggle={handleFavoriteToggle}
                    handleDetailsPage={handleDetailsPage}
                  />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
      {selectedPokemon && <Modal pokemon={selectedPokemon} onClose={closeModal} />}
    </section>
  );
};

Listing.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      front_image: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      is_favourite: PropTypes.bool.isRequired,
    })
  ).isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

export default Listing;
