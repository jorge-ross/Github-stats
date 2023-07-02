import { getGitProfile } from "../../services/gitapi-service";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Input from "../input";
import ProfileData from "../../pages/profile-data"
import LinkCard from "../link-card";
import styled from "@emotion/styled";
import {FaUsers} from 'react-icons/fa';
import {RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill, RiStarFill, RiSearchFill, RiUser3Fill } from 'react-icons/ri'

const Div = styled("div")`
    width: 411px;
    height: 731px;
    display: grid;
    place-items: center;
    gap: 16px;
    padding-bottom: 50%; 
    position: relative;
    background-color: #f2f2f2;

`

const Name = styled("div")`
    display: flex;
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
const StatSon = styled("div")`
    border-radius: 4px;
    background: #FFF;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
    padding-top: 13px;
    margin: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const NumStat = styled("h2")`
    color: #000;
    text-align: center;
    font-size: 28px;
    font-family: 'Source Code Pro', monospace;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const TextStat = styled("h3")`
    color: #000;
    text-align: center;
    font-size: 16px;
    font-family: 'Source Code Pro', monospace;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const ImgStat = styled("div")`
    width: 60px;
    height: 60px;
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

const Img = styled("img")`
  witdh: 7.5rem;
  height: 7.5rem;
`;

function InfoCard({ 
    setQueryFunction,
    favorites, 
    onAddFavorite, 
    onRemoveFavorite, 
    onProfile}){
    
    const [data, setData] = useState("")
    const [query, setQuery] = useState("");
    const [state, setState] = useState({});

    const { status, data: profile, error } = state;

    useEffect(() => {
        if (query === "") return;
        setState({ status: "pending", data: null, error: null });
    
        getGitProfile(query)
          .then((data) => {
            onProfile(data);
            setState({ status: "success", data: data, error: null });
          })
          .catch((error) => {
            setState({
              status: "error",
              data: null,
              error: error.message,
            });
          });
      }, [query, onProfile, setState]);

    console.log(data)
    console.log(data.login)
    console.log(data.bio)
    return(
        <Div>      
            <form>
                <Input
                name="query"
                placeholder="username"
                value={query}
                onChange={setQueryFunction}
                />
            </form>
                {status === "pending" && "Retrieving user..."}

                {status === "success" && query !== "" && (
                    <ProfileData
                    profile={profile}
                    favorites={favorites}
                    onAddFavorite={onAddFavorite}
                    onRemoveFavorite={onRemoveFavorite}
                    />
                )}

                {profile && query !== "" ? (
                    ""
                ) : (
                    <Img
                    src=""
                    alt="logo"
                    />
                )}

                {query === "" && "No user..."}

                {status === "error" && query !== "" && (
                    <p style={{ color: "red" }}>{error.message}</p>
                )}
            <ProfilePicture>
                <img src={data.avatar_url} alt="face" />
            </ProfilePicture>
            <Name>
                <h2>{data.name}</h2>
                <ImgStat style={{ paddingLeft: '10px' }}> 
                    <RiStarFill color="#2D9CDB" size={24}/>
                </ImgStat>     
            </Name>
            <div>
                <p>{data.bio}</p>
            </div>
            <Stats>
            <LinkCard
            icon={<FaUsers />}
            subtitle={"followers"}
            numStat={data.followers}
            url={`users/${data?.login}/followers`}
            color={"#2D9CDB"}
            />
            <LinkCard
            icon={<RiUserHeartFill />}
            subtitle={"followings"}
            numStat={data.following}
            url={`users/${data?.login}/followings`}
            color={"#F2994A"}
            />
            <LinkCard
            icon={<RiBookMarkFill />}
            subtitle={"public repos"}
            numStat={data.public_repos}
            url={`users/${data?.login}/repos`}
            color={"#219653"}
            />
            <LinkCard
            icon={<RiCodeBoxFill />}
            subtitle={"public gists"}
            numStat={data.public_gists}
            url={"/"}
            color={"#828282"}
            />
            </Stats>
            
            <ContainerBottom>
                <ContainerItems>
                    <Link to={"profile"}>
                        <RiUser3Fill color="#BDBDBD" size={50}></RiUser3Fill>
                    </Link>
                    <Link to="/">
                        <RiSearchFill color="#BDBDBD" size={50}></RiSearchFill>
                    </Link>
                    <Link to="/favorites">
                        <RiStarFill color="#BDBDBD" size={50}></RiStarFill>
                    </Link>
                </ContainerItems>
            </ContainerBottom>
            
        </Div>
    )
}

export default InfoCard;