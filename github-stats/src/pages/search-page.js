import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Input from "../components/input";
import { getGitProfile } from "../services/gitapi-service";
import InfoCard from "./InfoCard";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-weight: 400;
`;

const Img = styled("img")`
  witdh: 7.5rem;
  height: 7.5rem;
`;

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
    <Container>
      <Form>
        <Input
          name="query"
          placeholder="username"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Form>

      <div>
        {status === "pending" && "Retrieving user..."}
        {status === "success" && query !== "" && (
          <InfoCard
            profile={profile}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            favorites={favorites}
          />
        )}
        {profile && query !== "" ? (
          ""
        ) : (
          <Img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github"
          />
        )}

        {query === "" && "No user..."}

        {status === "error" && query !== "" && (
          <p style={{ color: "red" }}>{error.message}</p>
        )}
      </div>
    </Container>
  );
}

export default SearchPage;
