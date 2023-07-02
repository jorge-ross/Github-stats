import styled from "@emotion/styled";
import { typography } from "../styles";
import { useEffect, useState } from "react";
import { getProfileFollowers } from "../services/gitapi-service";
import { GrFormPrevious, GrNext } from "react-icons/gr";

const Title = styled.h1`
  display: flex;
  margin-bottom: 96px;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 2em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

const FollowersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
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
  padding: 4px 8px;
  gap: 8px;
  width: 202px;
  height: 30px;
  svg {
    font-size: 4rem;
  }
`;

const FollowersImage = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;

const PagingButton = styled.button`
  all: unset;
  text-align: center;
  color: ${({ current, children }) =>
    current === children ? "#fff" : "#00000"};
  display: flex;
  flex-direction: column;
  padding: 1px 8px;
  gap: 10px;
  background: ${({ current, children }) =>
    current === children ? "#2d9cdb" : ""};
  border-radius: 50px;
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

  return (
    <Wrapper>
      <Title>Followers ({profile.followers})</Title>
      <Paging>
        <GrFormPrevious size={16} onClick={handlePrevPage} />

        {[...Array(pageNumber)].slice(0, 5).map((_, index) => (
          <PagingButton key={index} current={page}>
            {index + 1}
          </PagingButton>
        ))}

        <GrNext size={16} onClick={handleNextPage} />
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
