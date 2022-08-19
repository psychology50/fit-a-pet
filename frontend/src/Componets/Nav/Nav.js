import React,{useState,useMemo} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import backimg from "../../image/back-button.png";


//import backimg from "../../assets/backBtn.svg";


function Nav({BackLink,EndLink,title,btnName}){
    // 네브바 뭉쳐보자ㅏㅏㅏㅏㅏㅏ
    const backimgCSS={
        background:`url(${backimg})`,
        backgroundSize:'cover',
        position: 'relative',
        width: '14px',
        height: '24px',
        left:'150%',
        top: '40%',
        border:'none',
    }

    return(
        <NavBar>
            <Link to={BackLink}>
                <button style={backimgCSS}></button>
            </Link>     
            <div className="title">{title}</div>
            <Link to={EndLink}>
                <button className="End-btn">{btnName}</button>
            </Link>
        </NavBar>      
    );
}
export default Nav;

const NavBar=styled.nav`
    display:flex;
    width:375px;
    height:50px;
    *{
        position:relative;
    }
    button:hover{
        /* border-radius:50px;      */
        cursor: pointer;
    }
    .title{
        width:160px;
        height:26px;
        font-size: 18px;
        top:40%;
        left:25%;
        text-align: center;
    }
    .End-btn{
        background:#F8F8F8;
        color:#A6A6A6;
        cursor:pointer;
        width: 80px;
        height: 23px;
        left:145%;
        top:40%;
        font-size: 16px;
        line-height: 23px;
        border:none;
    }
    .End-btn:hover{
        color:#FFA800;
    }
`;