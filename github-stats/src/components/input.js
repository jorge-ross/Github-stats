import styled from "@emotion/styled";
import { colors } from "../styles";

const StyledInput = styled("input")`
  ::placeholder {
    color: ${colors.gray.light};
  }
`;

function Input({
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
}) {
  return (
    <div>
      {label ? <label htmlFor={id || name}>{label}</label> : ""}
      <br />
      <StyledInput
        id={id || name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ textAlign: "center" }}
      />
    </div>
  );
}

export default Input;
