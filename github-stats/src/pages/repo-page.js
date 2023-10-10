import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import GitRepo from "./git-repos";
import { getRepos } from "../services/gitapi-service";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

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
  padding: 0 8px;
  gap: 8px;
  width: 100%;
  height: 30px;
`;

const PagButton = styled.button`
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

const ReposPage = ({ profile }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);

  const pageNumber = Math.ceil(profile.repos / 7);

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
    getRepos(profile.repos_url, page)
      .then((data) => {
        setRepos(data);
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
    <ContainerPage>
      <PublicRepos>Public Repos ({repos.length})</PublicRepos>

      <Paging>
        <GrFormPrevious
          onClick={handlePrevPage}
          style={{ cursor: "pointer", height: "16px", width: "16px" }}
          disabled={page === 1}
        />

        {pageNumbers.map((pageNumber) => (
          <PagButton key={pageNumber} current={page}>
            {pageNumber}
          </PagButton>
        ))}

        <GrFormNext
          onClick={handleNextPage}
          style={{ cursor: "pointer", height: "16px", width: "16px" }}
        />
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
