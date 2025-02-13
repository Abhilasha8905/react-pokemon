import { useState } from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/search.css";

const Search = ({ setSearchQuery, setFilterFavorites }) => {
  const [searchValue, setLocalSearchValue] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setLocalSearchValue(value);
  };

  const handleFavoritesToggle = () => {
    setFavoritesOnly((prev) => {
      const newValue = !prev;
      setFilterFavorites(newValue);
      return newValue;
    });
  };

  return (
    <section className="search-main">
      <div className="search-container">
        <div className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search Pokémon..."
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        <div className="filter-container">
          <p className="filter-info">Click the heart to filter favorites</p>
          <span
            type="button"
            className={`favorites-icon ${favoritesOnly ? "active" : ""}`}
            onClick={handleFavoritesToggle}
          >
            {favoritesOnly ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart color="gray" />
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

Search.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  setFilterFavorites: PropTypes.func.isRequired,
};

export default Search;
