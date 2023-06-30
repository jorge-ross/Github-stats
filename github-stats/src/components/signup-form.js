import { useState } from "react";

import Input from "./input";
import { useAuth } from "../context/auth-context";

function SignupForm() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const { email, password, first_name, last_name } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({ email, password, first_name, last_name });

    signup(formData);
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
        <Input
          name="first_name"
          value={first_name}
          onChange={handleChange}
          label="First Name"
        />
        <Input
          name="last_name"
          value={last_name}
          onChange={handleChange}
          label="Last Name"
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignupForm;
