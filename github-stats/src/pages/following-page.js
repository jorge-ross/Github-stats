import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { typography } from "../styles";
import { getProfileFollowings } from "../services/gitapi-service";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const MainTitle = styled.h1`
  ${typography.head.lg}
  padding-top: 16px;
`;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

const FollowingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const FollowingCard = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  width: 300px;
  height: 56px;
  ${typography.text.md};
  background: #ffffff;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const Paging = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  gap: 8px;
  width: 100%;
  height: 30px;
`;

const PagingButton = styled.button`
  all: unset;
  text-align: center;
  color: ${({ current, children }) =>
    current === children ? "#fff" : "#00000"};
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  gap: 10px;
  background: ${({ current, children }) =>
    current === children ? "#2d9cdb" : ""};
  border-radius: 50px;
  width: 10px;
`;

const FollowingImage = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;

function FollowingPage({ profile }) {
  const [followings, setFollowings] = useState([]);
  const [page, setPage] = useState(1);

  const pageNumber = Math.ceil(profile.following / 7);

  function handlePrevPage() {
    if (page === 1) return;

    const newPage = page - 1;
    setPage(newPage);
  }

  function handleNextPage() {
    if (page === pageNumber) return;
    const newPage = page + 1;
    setPage(newPage);
  }

  useEffect(() => {
    getProfileFollowings(profile.login, page)
      .then((data) => {
        setFollowings(data);
      })
      .catch(console.log);
  }, [profile, page]);

  const pagesToShow = 5;
  const startPage = Math.max(1, page - Math.floor(pagesToShow - 1));
  const endPage = Math.min(pageNumber, startPage + pagesToShow - 1);

  const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  return (
    <Wrapper>
      <MainTitle>Followings ({profile.following})</MainTitle>

      <Paging>
        <GrFormPrevious
          onClick={handlePrevPage}
          style={{ cursor: "pointer", height: "16px", width: "16px" }}
          disabled={page === 1}
        />

        {pageNumbers.map((pageNumber) => (
          <PagingButton key={pageNumber} current={page}>
            {pageNumber}
          </PagingButton>
        ))}

        <GrFormNext
          onClick={handleNextPage}
          style={{ cursor: "pointer", height: "16px", width: "16px" }}
        />
      </Paging>

      <FollowingContainer>
        {followings.map((following) => (
          <FollowingCard value={following.login} key={following.id}>
            <FollowingImage src={following?.avatar_url} alt="icon" />
            {following.login}
          </FollowingCard>
        ))}
      </FollowingContainer>
    </Wrapper>
  );
}

export default FollowingPage;
