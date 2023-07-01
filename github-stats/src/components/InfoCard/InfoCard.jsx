import hitCardData from "../../services/hit-card-data"
import { useState, useEffect } from "react"
import styled from "@emotion/styled";
import {FaUsers} from 'react-icons/fa';
import {RiUserHeartFill, RiBookMarkFill, RiCodeBoxFill} from 'react-icons/ri'

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
const imgStat = styled("div")`
    width: 60px;
    height: 60px;
`

function InfoCard(){
    
    const [data,setData] = useState("")
    useEffect(()=>{
        hitCardData().then((response)=>{setData(response)})
    },[])

    console.log(data)
    console.log(data.login)
    console.log(data.bio)
    return(
        <div>
            <p>{data.login}</p>
            <ProfilePicture>
                <img src={data.avatar_url} alt="face" />
            </ProfilePicture>
            <Name>
                <h2>{data.name}</h2>
                <span>X</span>
            </Name>
            <p>{data.bio}</p>
            <Stats>
                <StatSon>
                    <imgStat>
                        <FaUsers color="#2D9CDB" size={60}/>
                    </imgStat>
                    <NumStat>{data.followers}</NumStat>
                    <TextStat>followers</TextStat>
                </StatSon>
                <StatSon>
                    <imgStat>
                        <RiUserHeartFill color="#F2994A" size={60}/>
                    </imgStat>
                    <NumStat>{data.following}</NumStat>
                    <TextStat>followings</TextStat>
                </StatSon>
                <StatSon>
                    <imgStat>
                        <RiBookMarkFill color="#219653" size={60}></RiBookMarkFill>
                    </imgStat>
                    <NumStat>{data.public_repos}</NumStat>
                    <TextStat>public repos</TextStat>
                </StatSon>
                <StatSon>
                    <imgStat>
                        <RiCodeBoxFill color="#828282" size={60}></RiCodeBoxFill>
                    </imgStat>
                    <NumStat>{data.public_gists}</NumStat>
                    <TextStat>public gists</TextStat>
                </StatSon>
            </Stats>
        </div>
    )
}

export default InfoCard