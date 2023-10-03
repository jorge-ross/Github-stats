import { useState } from "react";
import styled from "@emotion/styled";

import { fonts } from "./styles";
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

const GralContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled("div")`
  width: 411px;
  height: 731px;
  background-color: #f2f2f2;
  display: flex;
  width: 411px;
  padding: 48px 73px 83px 74px;
  flex-direction: column;
  align-items: center;
  gap: 96px;
`;
const MainTitle = styled("h1")`
  color: #000;
  text-align: center;
  font-size: 32px;
  font-family: ${fonts.secondary};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const AccesOption = styled("p")`
  color: var(--blue-2, #2d9cdb);
  font-size: 16px;
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: 700;
  font-family: ${fonts.primary};
  line-height: normal;
  transition: 1s;
  &:hover {
    color: #80d1ff;
  }
`;
function UnauthenticatedApp() {
  const [showLogin, setShowLogin] = useState(true);

  function handleLinkClick() {
    setShowLogin(!showLogin);
  }

  return (
    <GralContainer>
      <MainContainer>
        <MainTitle>Welcome to Github Stats</MainTitle>
        {showLogin ? <LoginForm /> : <SignupForm />}

        <CustomLink onClick={handleLinkClick}>
          {showLogin ? (
            <AccesOption>Create Account</AccesOption>
          ) : (
            <AccesOption>Login</AccesOption>
          )}
        </CustomLink>
      </MainContainer>
    </GralContainer>
  );
}

export default UnauthenticatedApp;
