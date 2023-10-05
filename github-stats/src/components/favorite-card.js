import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  border-radius: 4px;
  width: 300px;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: #000000;
  svg {
    width: 50px;
    height: 50px;
    fill: ${({ color }) => color};
  }
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
`;

const FavoriteCard = ({ username, name, avatar, icon }) => {
  return (
    <CardContainer>
      <img
        style={{ width: "40px", borderRadius: "50%" }}
        src={`${avatar}`}
        alt=""
      ></img>
      <div style={{ height: "35px", width: "185.13px", padding: "0px" }}>
        <h3
          style={{
            fontSize: "16px",
            height: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: "12px",
            height: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {username}
        </p>
      </div>
      {icon}
    </CardContainer>
  );
};

export default FavoriteCard;
