import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../components/input";

function SearchPage({ favorites, onAddFavorite, onRemoveFavorite }) {
  const [query, setQuery] = useState("");

  const [state, setState] = useState({
    status: "idle", // idle = inactive // success // error // pending
    data: null,
    error: null,
  });

  const { status, data: pokemon, error } = state;

  const isFavorite = Boolean(
    favorites.find((fav) => fav.pokemon_name === pokemon?.name)
  );

  function handleSubmit(event) {
    event.preventDefault();
    setState({ status: "pending", data: null, error: null });

    // eslint-disable-next-line no-undef
    getPokemon(query)
      .then((data) => {
        setState({ status: "success", data, error: null });
      })
      .catch((_error) => {
        setState({
          status: "error",
          data: null,
          error: "El pokemon no existe! intente de nuevo",
        });
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          name="query"
          placeholder="pokemon name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button>Search</button>
      </form>
      {status === "pending" && "Loading..."}
      {status === "idle" && "Ready to search"}
      {status === "success" && (
        // ProfileData
        // eslint-disable-next-line react/jsx-no-undef
        <PokemonData
          pokemon={pokemon}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
          isFavorite={isFavorite}
        />
      )}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}

      <Link to="/favorites">Go to Favorites</Link>
    </div>
  );
}

export default SearchPage;
