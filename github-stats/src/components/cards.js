import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const ContainerCard = styled(Link)`
  background: #ffffff;
  max-width: 140px;
  padding: 18px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  text-decoration: none;
  color: #000000;
  svg {
    width: 50px;
    height: 50px;
    fill: ${({ color }) => color};
  }
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
`;

const Amount = styled("p")`
  font.weight: 400;
  font-size: 28px;
  line-height: 35.2px;
`;

const Text = styled("p")`
  font-weight: 400;
  font-size: 16px;
  line-height: 20.11px;
`;

const CardIcon = ({ icon, amount, text, url, color }) => {
  return (
    <ContainerCard to={url} color={color}>
      {icon}
      <Amount>{amount}</Amount>
      <Text>{text}</Text>
    </ContainerCard>
  );
};

export default CardIcon;
