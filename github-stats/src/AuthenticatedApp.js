import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { useAuth } from "./context/auth-context";
import SearchPage from "./pages/search-page";
import FavoritesPage from "./pages/favorites-page";
import {
  createFavorite,
  removeFavorite,
  getFavorites,
} from "./services/favorites-service";

function AuthenticatedApp() {
  const { logout } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  function handleAddFavorite(pokemon) {
    const data = {
      pokemon_name: pokemon?.name,
      pokemon_id: pokemon.id,
      pokemon_type: pokemon.types[0].type?.name,
      pokemon_avatar_url:
        pokemon.sprites.other["official-artwork"].front_default,
    };

    createFavorite(data)
      .then((newFavorite) => setFavorites([...favorites, newFavorite]))
      .catch(console.log);
  }

  function handleRemoveFavorite(pokemon) {
    const favorite = favorites.find(
      (fav) => fav.pokemon_name === pokemon?.name
    );

    removeFavorite(favorite.id).then(() => {
      const newFavorites = favorites.filter(
        (fav) => fav.pokemon_name !== pokemon?.name
      );

      setFavorites(newFavorites);
    });
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              favorites={favorites}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
            />
          }
        />
        <Route
          path="favorites"
          element={<FavoritesPage favorites={favorites} />}
        />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
