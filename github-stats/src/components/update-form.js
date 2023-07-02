import { useState } from "react";
import styled from "@emotion/styled";
import { colors, typography } from "../styles";
import InfoCard from "../pages/InfoCard";
import { useAuth } from "../context/auth-context";
import Input from "./input";

const Wrapper = styled.div`
display: flex,
flex-direction: column,
align-items: center,
align-self: center,`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 400;
`;

function UpdateForm() {
  const { update, user, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: user.email,
    password: "",
    first_name: user.first_name,
    last_name: user.last_name,
  });

  const [updateForm, setUpdateForm] = useState(false);
  const { email, password, first_name, last_name } = formData;

  return (
    <Wrapper>
      <Title>Profile</Title>
      <Input name="email" type="email" value={email} label="Email" />
      <Input
        name="password"
        type="password"
        value={password}
        placeholder="**********"
        label="Password"
      />
      <Input
        name="first_name"
        type="first_name"
        value={first_name}
        label="First Name"
      />
      <Input
        name="last_name"
        type="last_name"
        value={last_name}
        label="Last Name"
      />
    </Wrapper>
  );
}

export default UpdateForm;
