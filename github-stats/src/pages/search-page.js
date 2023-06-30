import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Input from "../components/input";
import { getGitProfile } from "../services/gitapi-service";
import ProfileData from "./profile-data";

function SearchPage({ favorites, onAddFavorite, onRemoveFavorite, onProfile }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState({});

  const { status, data: profile, error } = state;

  useEffect(() => {
    if (query === "") return;
    setState({ status: "pending", data: null, error: null });

    getGitProfile(query)
      .then((data) => {
        onProfile(data);
        setState({ status: "success", data: data, error: null });
      })
      .catch((error) => {
        setState({
          status: "error",
          data: null,
          error: error.message,
        });
      });
  }, [query, onProfile, setState]);

  return (
    <div>
      <form>
        <Input
          name="query"
          placeholder="username"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
      {status === "pending" && "Retrieving user..."}
      {status === "success" && query !== "" && (
        <ProfileData
          profile={profile}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
          favorites={favorites}
        />
      )}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}

      <Link to="/favorites">Go to Favorites</Link>
    </div>
  );
}

export default SearchPage;
