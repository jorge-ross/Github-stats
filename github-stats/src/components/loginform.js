import { useState } from "react";

import Input from "./input";
import { useAuth } from "../context/auth-context";

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "testino@mail.com",
    password: "letmein",
  });

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
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
