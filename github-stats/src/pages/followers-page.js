import styled from "@emotion/styled";
import { typography } from "../styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileFollowers } from "../services/gitapi-service";

const Title = styled.h1`
  display: flex;
  margin-bottom: 96px;
  font-size: 2em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

function FollowersPage({ profile }) {
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(1);

  const pageNumber = Math.ceil(profile.followers / 7);

  function handleDecresePage() {
    if (page === 1) return;

    const newPage = page - 1;
    setPage(newPage);
  }

  function handleIncresePage() {
    if (page === pageNumber) return;
    const newPage = page + 1;
    setPage(newPage);
  }

  useEffect(() => {
    getProfileFollowers(profile.login, page)
      .then((data) => {
        setFollowers(data);
      })
      .catch(console.log);
  }, [profile, page]);

  return (
    <Wrapper>
      <Title>Followers ({profile.followers})</Title>
      <Link
        style={{
          textDecoration: "none",
          color: "#2D9CDB",
          fontWeight: "500",
          fontSize: "1.1rem",
        }}
        to="/"
      >
        Go back{" "}
      </Link>
    </Wrapper>
  );
}

export default FollowersPage;
