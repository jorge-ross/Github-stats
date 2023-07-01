import hitCardData from "../../services/hit-card-data"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Input from "../input";

import styled from "@emotion/styled";
import {FaUsers} from 'react-icons/fa';
import {RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill, RiStarFill, RiSearchFill, RiUser3Fill} from 'react-icons/ri'

const Div = styled("div")`
    width: 100%;
    height: 100%;
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

function InfoCard({query, setQueryFunction}){
    
    const [data,setData] = useState("")
    useEffect(()=>{
        hitCardData().then((response)=>{setData(response)})
    },[])

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
            <ProfilePicture>
                <img src={data.avatar_url} alt="face" />
            </ProfilePicture>
            <Name>
                <h2>{data.name}</h2>
                <span>X</span>
            </Name>
            <div>
                <p>{data.bio}</p>
            </div>
            <Stats>
                <StatSon>
                    <ImgStat>
                        <FaUsers color="#2D9CDB" size={60}/>
                    </ImgStat>
                    <NumStat>{data.followers}</NumStat>
                    <TextStat>followers</TextStat>
                </StatSon>
                <StatSon>
                    <ImgStat>
                        <RiUserHeartFill color="#F2994A" size={60}/>
                    </ImgStat>
                    <NumStat>{data.following}</NumStat>
                    <TextStat>followings</TextStat>
                </StatSon>
                <StatSon>
                    <ImgStat>
                        <RiBookMarkFill color="#219653" size={60}></RiBookMarkFill>
                    </ImgStat>
                    <NumStat>{data.public_repos}</NumStat>
                    <TextStat>public repos</TextStat>
                </StatSon>
                <StatSon>
                    <ImgStat>
                        <RiCodeBoxFill color="#828282" size={60}></RiCodeBoxFill>
                    </ImgStat>
                    <NumStat>{data.public_gists}</NumStat>
                    <TextStat>public gists</TextStat>
                </StatSon>
            </Stats>
            <ContainerBottom>
                <ContainerItems>
                    <Link to="/favorites">
                        <RiUser3Fill color="#BDBDBD" size={50}></RiUser3Fill>
                    </Link>
                    <Link to="/favorites">
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

export default InfoCard