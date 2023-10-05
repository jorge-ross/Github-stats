import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import FavoriteCard from "../components/favorite-card";
import { useState } from "react";
import { colors, typography } from "../styles";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { RiStarFill } from "react-icons/ri";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 700px;
  padding-top: 16px;
  align-items: center;
`;

const PageNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  gap: 8px;
  width: 202px;
  height: 30px;
`;

const PagButton = styled.button`
  all: unset;
  color: ${colors.white};
  background: ${colors.blue[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  gap: 10px;
  border-radius: 50px;
  width: 26px;
  height: 22px;
  cursor: pointer;
`;

const FavTitle = styled.p`
  ${typography.head.lg};
  padding-bottom: 8px;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

function FavoritesPage({ favorites }) {
  const [page, setPage] = useState(1);

  const pageNumber = Math.ceil(favorites.length / 7);

  function handlePreviousPage() {
    if (page === 1) return;

    const newPage = page - 1;
    setPage(newPage);
  }

  function handleNextPage() {
    if (page === pageNumber) return;
    const newPage = page + 1;
    setPage(newPage);
  }

  let category = 0;
  let groupByCategory = favorites.reduce((ac, product, index) => {
    if (index % 7 === 0) {
      category++;
    }
    ac[category] = ac[category] ?? [];
    ac[category].push(product);
    return ac;
  }, {});

  return (
    <Wrapper>
      <FavTitle>Favorites ({favorites.length})</FavTitle>
      <PageNav>
        <GrFormPrevious
          onClick={handlePreviousPage}
          style={{ cursor: "pointer", height: "25px", width: "25px" }}
        />
        {[...Array(pageNumber)].map((page, index) => (
          <PagButton key={index} current={page}>
            {index + 1}
          </PagButton>
        ))}
        <GrFormNext
          onClick={handleNextPage}
          style={{ cursor: "pointer", height: "25px", width: "25px" }}
        />
      </PageNav>

      <CardWrapper>
        {groupByCategory[`${page}`]?.map((fav, index) => (
          <FavoriteCard
            key={index}
            username={fav.username}
            name={fav.name}
            avatar={fav.avatar_url}
            icon={
              <RiStarFill
                color={colors.yellow[500]}
                style={{ height: "24px", width: "25px" }}
              />
            }
          ></FavoriteCard>
        ))}
      </CardWrapper>
    </Wrapper>
  );
}

export default FavoritesPage;
