import { useState } from "react";
import styled from "@emotion/styled";

import Input from "./input";
import { useAuth } from "../context/auth-context";

export const ValidButton = styled("button")`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 4px;
  background: #2d9cdb;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  color: white;
  transition: 1s;
  &:hover {
    background-color: #80d1ff;
  }
`;

export const MainContainer = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({});

  const { email, password } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    login(formData);
  }

  return (
    <div>
      <MainContainer onSubmit={handleSubmit}>
        <Input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="example@mail.com"
          label="Email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="********"
          label="Password"
        />
        <ValidButton type="submit">Login</ValidButton>
      </MainContainer>
    </div>
  );
}

export default LoginForm;
