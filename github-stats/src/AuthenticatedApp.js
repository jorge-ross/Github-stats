import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";

import UpdateForm from "./components/update-form";
import SearchPage from "./pages/search-page";
import FavoritesPage from "./pages/favorites-page";
import FollowersPage from "./pages/followers-page";
import {
  createFavorite,
  removeFavorite,
  getFavorites,
} from "./services/favorites-service";

const Div = styled("div")`
  display: flex;
  height: 731px;
  width: 411px;
  justify-items: center;
`;

function AuthenticatedApp() {
  const [favorites, setFavorites] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  function handleAddFavorite(profile) {
    const data = {
      name: profile.name,
      username: profile.login,
      avatar_url: profile.avatar_url,
    };

    createFavorite(data)
      .then((newFavorite) => setFavorites([...favorites, newFavorite]))
      .catch(console.log);
  }

  function handleRemoveFavorite(profile) {
    const favorite = favorites.find((fav) => fav.username === profile?.name);

    removeFavorite(favorite.id).then(() => {
      const newFavorites = favorites.filter(
        (fav) => fav.username !== profile?.name
      );

      setFavorites(newFavorites);
    });
  }

  return (
    <Div>
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              favorites={favorites}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              onProfile={setProfile}
            />
          }
        />
        <Route path="profile" element={<UpdateForm />} />
        <Route
          path="favorites"
          element={<FavoritesPage favorites={favorites} />}
        />
        <Route path="/users/:username"></Route>
      </Routes>
    </Div>
  );
}

export default AuthenticatedApp;
