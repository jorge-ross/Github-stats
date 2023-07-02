import { getGitProfile } from "../../services/gitapi-service";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Input from "../input";
import LinkCard from "../link-card";
import styled from "@emotion/styled";
import {FaUsers} from 'react-icons/fa';
import {RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill, RiStarFill, RiSearchFill, RiUser3Fill } from 'react-icons/ri'

const Div = styled("div")`
    display: flex;
    place-items: center;
    flex-direction:column;
    gap: 16px;
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
            
            
            
        </Div>
    )
}

export default InfoCard;