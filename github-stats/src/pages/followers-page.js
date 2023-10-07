import styled from "@emotion/styled";
import { typography } from "../styles";
import { useEffect, useState } from "react";
import { getProfileFollowers } from "../services/gitapi-service";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Title = styled.h1`
  ${typography.head.lg};
  padding-bottom: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
  padding-top: 16px;
`;

const FollowersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const FollowersCard = styled("div")`
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

const FollowersImage = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;

const PagingButton = styled.button`
  all: unset;
  align-items: center;
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

function FollowersPage({ profile }) {
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(1);

  const pageNumber = Math.ceil(profile.followers / 7);

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
    getProfileFollowers(profile.login, page)
      .then((data) => {
        setFollowers(data);
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
      <Title>Followers ({profile.followers})</Title>
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

      <FollowersContainer>
        {followers.map((follower, index) => (
          <FollowersCard value={follower.login} key={`${index}`}>
            <FollowersImage src={follower?.avatar_url} alt="icono" />
            {follower.login}
          </FollowersCard>
        ))}
      </FollowersContainer>
    </Wrapper>
  );
}

export default FollowersPage;
