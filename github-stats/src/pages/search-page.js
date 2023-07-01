import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Input from "../components/input";
import { getGitProfile } from "../services/gitapi-service";
import ProfileData from "./profile-data";
import InfoCard from "../components/InfoCard/InfoCard";

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
      <InfoCard
        query={query}
        setQueryFunction={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}

export default SearchPage;
