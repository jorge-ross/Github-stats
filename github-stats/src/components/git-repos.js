import styled from "@emotion/styled";
import Icon from "../pages/icon-container";
import { VscRepoForked } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

const ContainRepo = styled("a")`
  min-width: 330px;
  max-width: 330px;
  padding: 0 12px;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  color: black;
`;
const Icons = styled("div")`
  display: flex;
  gap: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  color: #2d9cdb;
  font-size: 16px;
  font-weight: 700;
  line-height: 20.11px;
`;

const GitRepo = ({
  fork = 0,
  stars = 0,
  language = 0,
  description,
  name,
  url,
}) => {
  return (
    <ContainRepo href={`${url}`} target="_blank">
      <Title>{name}</Title>
      <Icons>
        <Icon icon={<BsCircleFill />} text={language} />
        <Icon icon={<AiOutlineStar />} text={stars} />
        <Icon icon={<VscRepoForked />} text={fork} />
      </Icons>
    </ContainRepo>
  );
};

export default GitRepo;
