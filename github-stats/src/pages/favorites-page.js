import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const typeColors = {
  grass: "#74CB48",
  electric: "#F9CF30",
  fire: "#F57D31",
};

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PokeCard = styled("div")`
  border: 2px solid ${({ type }) => typeColors[type]};
`;

function FavoritesPage({ favorites }) {
  return (
    <Wrapper>
      {favorites.map((fav, index) => (
        <PokeCard key={`poke${index}`} type={fav.pokemon_type}>
          {fav.pokemon_name}
        </PokeCard>
      ))}

      <Link to="/">Go back to search</Link>
    </Wrapper>
  );
}

export default FavoritesPage;
