import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LinkContainer = styled(Link)`
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

const NumStat = styled("p")`
  font.weight: 400;
  font-size: 28px;
  line-height: normal;
`;

const Subtitle = styled("p")`
  font-weight: 400;
  font-size: 16px;
  line-height: normal;
`;

const LinkCard = ({ icon, numStat, subtitle, url, color }) => {
  return (
    <LinkContainer to={url} color={color}>
      {icon}
      <NumStat>{numStat}</NumStat>
      <Subtitle>{subtitle}</Subtitle>
    </LinkContainer>
  );
};

export default LinkCard;
