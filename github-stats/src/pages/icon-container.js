import styled from "@emotion/styled";

const ContainIcon = styled("div")`
  display: flex;
  gap: 4.2px;
  font-size: 12px;
  line-height: 15.08px;
  font-weight: 400;
  align-items: center;
`;

const Icon = ({ icon, text }) => {
  return (
    <ContainIcon>
      {icon}

      <p>{text}</p>
    </ContainIcon>
  );
};

export default Icon;
