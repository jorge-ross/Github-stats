import styled from "@emotion/styled";
import { colors } from "../styles";

import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  display: flex;
  padding: 8px;
  gap: 12px;
  color: #bdbdbd;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 50px;
  &:hover {
    svg {
      fill: #828282;
    }
  }
  &:focus {
    svg {
      fill: #828282;
    }
  }
  &:visited {
  }
`;

function NavBarItem({ name, icon, to }) {
  return (
    <StyledNavLink
      to={to}
      style={({ isActive }) => {
        if (!isActive) return;
        return {
          background: colors.gray[400],
          "&:hover": {
            svg: {
              fill: "#828282",
            },
          },
          "&:visited": {
            svg: {
              fill: "#fffff",
            },
          },
        };
      }}
    >
      {icon}
      {name}
    </StyledNavLink>
  );
}

export default NavBarItem;
