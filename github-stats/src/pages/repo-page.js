import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import GitRepo from "./git-repos";
import { getRepos } from "../services/gitapi-service";

const PublicRepos = styled("p")`
  font-weight: 400;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
`;

const ContainerRepos = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ContainerPage = styled("div")`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

const PagButton = styled.button`
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

const ReposPage = ({ profile }) => {
  const [repos, setRepos] = useState([]);
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
    getRepos(profile.repos_url, page)
      .then((data) => {
        setRepos(data);
      })
      .catch(console.log);
  }, [profile, page]);

  return (
    <ContainerPage>
      <PublicRepos>Public Repos ({repos.length})</PublicRepos>

      <Paging>
        <img alt="" onClick={handleDecresePage}></img>
        {[...Array(pageNumber)].map((index) => (
          <PagButton key={index} current={page}>
            {index + 1}
          </PagButton>
        ))}
        <img src={1} alt="" onClick={handleIncresePage}></img>
      </Paging>

      <ContainerRepos>
        {repos.map((repo, index) => {
          return (
            <GitRepo
              key={index}
              description={repo.description || "Description"}
              fork={repo.forks_count}
              language={repo.language || "none"}
              name={repo.name}
              stars={repo.stargazers_count}
              url={repo.html_url}
            ></GitRepo>
          );
        })}
      </ContainerRepos>
    </ContainerPage>
  );
};

export default ReposPage;
