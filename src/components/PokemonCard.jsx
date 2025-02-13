import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { capitalizeFirstLetter } from "../utils/functions";
import React from "react";

const PokemonCard = ({ pokemon, handleFavoriteToggle, handleDetailsPage }) => {
  return (
    <div key={pokemon.id} className="main-div">
      <p className="pokemon-id">#{pokemon.id}</p>
      <span
        onClick={() => handleFavoriteToggle(pokemon)}
        className={pokemon.is_favourite ? "favorited" : ""}
      >
        {pokemon.is_favourite ? <FaHeart /> : <FaRegHeart />}
      </span>
      <div className="inside-div" onClick={() => handleDetailsPage(pokemon)}>
        <div className="img">
          <img src={pokemon.front_image} alt={pokemon.name} />
        </div>
        <div className="pokemon-info">
          <h4>{capitalizeFirstLetter(pokemon.name)}</h4>
        </div>
        <div className="pokemon-details">
          <p>Weight: {pokemon.weight / 10} kg</p>
          <p>Height: {pokemon.height / 10} m</p>
        </div>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    front_image: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    is_favourite: PropTypes.bool.isRequired,
  }).isRequired,
  handleFavoriteToggle: PropTypes.func.isRequired,
  handleDetailsPage: PropTypes.func.isRequired,
};

const MemoizedPokemonCard = React.memo(PokemonCard);
export default MemoizedPokemonCard;
