import styled from "@emotion/styled";

import { colors, typography } from "../styles";
import LinkCard from "../components/link-card";
import {FaUsers} from 'react-icons/fa';
import {RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill, RiStarFill, RiStarLine } from 'react-icons/ri'

const Div = styled("div")`
    display: flex;
    place-items: center;
    flex-direction:column;
    gap: 16px;
    position: relative;
    background-color: #f2f2f2;
`

const NameContainer = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const ProfilePicture = styled("div")`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
`
const Stats = styled("div")`
    width: 296px;
    height: 296px;
    display: grid;
    grid-template-columns: repeat(2,148px);
    grid-template-rows: repeat(2,148px);
    gap: 16px;
`


const ContainerBottom = styled("div")`
    width: 100%;
    height: 65px;
    border-top: 2px solid #828282;
    position: absolute;
    bottom: 0; 
    padding: 0 16px;
    display: grid;
    place-items: center;
`
const ContainerItems = styled("div")`
    display: flex;
    gap: 50px;
    flex-direction: row;
`
const UserName = styled.p`
  display: flex;
  min-width: 132px;
  gap: 0.5rem;
  ${typography.text.lg};
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;


function InfoCard({ profile, favorites, onAddFavorite, onRemoveFavorite }){
  const regularContent = (
    <>
      <RiStarLine color={"#828282"} style={{ fontSize: "1.3rem" }} />
    </>
  );

  const favoriteContent = (
    <>
      <RiStarFill color={colors.yellow[500]} style={{ fontSize: "1.3rem" }} />
    </>
  );

  const isFavorite = Boolean(
    favorites?.find((fav) => fav.username === profile?.login)
  );
    // console.log(data)
    // console.log(data.login)
    // console.log(data.bio)
    return(
    <Div>      
      <ProfilePicture src={profile?.avatar_url}/>
      <NameContainer>
        <UserName>{profile?.name}</UserName>
        <FavoriteButton
          onClick={() =>
            isFavorite ? onRemoveFavorite(profile) : onAddFavorite(profile)
          }
        >
          {isFavorite ? favoriteContent : regularContent}
        </FavoriteButton>
      </NameContainer>
      <p> {profile?.bio} </p>
        <Stats>
            <LinkCard
            icon={<FaUsers />}
            text={"followers"}
            amount={profile?.followers}
            url={`users/${profile?.login}/followers`}
            color={"#2D9CDB"}
            />
            <LinkCard
            icon={<RiUserHeartFill />}
            text={"followings"}
            amount={profile?.following}
            url={`users/${profile?.login}/followings`}
            color={"#F2994A"}
            />
            <LinkCard
            icon={<RiBookMarkFill />}
            text={"public repos"}
            amount={profile?.public_repos}
            url={`users/${profile?.login}/repos`}
            color={"#219653"}
            />
            <LinkCard
            icon={<RiCodeBoxFill />}
            text={"public gists"}
            amount={profile?.public_gists}
            url={"/"}
            color={"#828282"}
            />
      </Stats>
            
    </Div>
    )
}

export default InfoCard;