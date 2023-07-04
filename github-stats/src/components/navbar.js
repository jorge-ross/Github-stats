import styled from "@emotion/styled";

import { RiUserFill, RiSearchFill, RiStarFill } from "react-icons/ri";
import NavBarItem from "./nav-item";

const NavbarContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #828282;
`;

function Navbar() {
  const option = {
    profile: <RiUserFill />,
    search: <RiSearchFill />,
    favorite: <RiStarFill />,
  };
  return (
    <NavbarContainer>
      <NavBarItem to={"profile"} icon={option.profile} />
      <NavBarItem to={"/"} icon={option.search} />
      <NavBarItem to={"favorites"} icon={option.favorite} />
    </NavbarContainer>
  );
}

export default Navbar;
