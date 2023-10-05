import styled from "@emotion/styled";

import { colors, typography } from "../styles";
import LinkCard from "../components/link-card";
import {FaUsers} from 'react-icons/fa';
import {RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill, RiStarFill, RiStarLine } from 'react-icons/ri'

const Container = styled("div")`
    display: flex;
    place-items: center;
    flex-direction:column;
    gap: 16px;
    position: relative;
    background-color: #f2f2f2;
    height: 520px;
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  height: 25px;
`;
const ProfilePicture = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
`
const Stats = styled("div")`
    width: 296px;
    height: 296px;
    display: grid;
    grid-template-columns: repeat(2,148px);
    grid-template-rows: repeat(2,148px);
    gap: 16px;
`

const ProfileName = styled.p`
  display: flex;
  min-width: 132px;
  gap: 0.5rem;
  ${typography.text.xl};
  justify-content: center;
`;

const ProfileBio = styled.p`
  width: 360px;
  ${typography.text.md};
  text-align: center;
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
      <RiStarLine color={"#828282"} size={25} />
    </>
  );

  const favoriteContent = (
    <>
      <RiStarFill color={colors.yellow[500]} size={25}/>
    </>
  );

  const isFavorite = Boolean(
    favorites?.find((fav) => fav.username === profile?.login)
  );

    return(
    <Container>      
      <ProfilePicture src={profile?.avatar_url}/>
      <NameContainer>
        <ProfileName>{profile?.name}</ProfileName>
        <FavoriteButton
          onClick={() =>
            isFavorite ? onRemoveFavorite(profile) : onAddFavorite(profile)
          }
        >
          {isFavorite ? favoriteContent : regularContent}
        </FavoriteButton>
      </NameContainer>
      <ProfileBio> {profile?.bio} </ProfileBio>
        <Stats>
            <LinkCard
            icon={<FaUsers />}
            subtitle={"followers"}
            numStat={profile?.followers}
            url={`users/${profile?.login}/followers`}
            color={"#2D9CDB"}
            />
            <LinkCard
            icon={<RiUserHeartFill />}
            subtitle={"followings"}
            numStat={profile?.following}
            url={`users/${profile?.login}/followings`}
            color={"#F2994A"}
            />
            <LinkCard
            icon={<RiBookMarkFill />}
            subtitle={"public repos"}
            numStat={profile?.public_repos}
            url={`users/${profile?.login}/repos`}
            color={"#219653"}
            />
            <LinkCard
            icon={<RiCodeBoxFill />}
            subtitle={"public gists"}
            numStat={profile?.public_gists}
            url={"/"}
            color={"#828282"}
            />
      </Stats>
            
    </Container>
    )
}

export default InfoCard;