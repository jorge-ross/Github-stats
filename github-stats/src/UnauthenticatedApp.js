import { useState } from "react";
import styled from "@emotion/styled";

import { colors } from "./styles";
import LoginForm from "./components/loginform";
import SignupForm from "./components/signup-form";

const CustomLink = styled("button")`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${colors.gray.medium};
  }
`;

function UnauthenticatedApp() {
  const [showLogin, setShowLogin] = useState(true);

  function handleLinkClick() {
    setShowLogin(!showLogin);
  }

  return (
    <div>
      <h1>Welcome to Github Stats</h1>
      {showLogin ? <LoginForm /> : <SignupForm />}

      <CustomLink onClick={handleLinkClick}>
        {showLogin ? "Create Account" : "Login"}
      </CustomLink>
    </div>
  );
}

export default UnauthenticatedApp;
