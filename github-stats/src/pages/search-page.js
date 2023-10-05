import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import SearchInput from "../components/search-input";
import { getGitProfile } from "../services/gitapi-service";
import InfoCard from "./InfoCard";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 700px;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  place-items: center;
  text-align: center;
`;

const Img = styled("img")`
  witdh: 7.5rem;
  height: 7.5rem;
`;

const Searching = styled("div")`
  text-align: center;
  font-size: 20px;
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
        <SearchInput
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
        <br />
        <Searching>
          {query === "" && "No user..."}

          {status === "error" && query !== "" && (
            <p style={{ color: "red" }}>{error.message}</p>
          )}
        </Searching>
      </div>
    </Container>
  );
}

export default SearchPage;
