import React,{useState} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import ximg from "../../image/x-btn.png";

function MemberSearchNav(){
    const ximgCSS={
        background:`url(${ximg})`,
        backgroundSize:'cover',
        width: '16px',
        height: '16px',
        left:'20%',
        top: '40%',
        border:'none'
    }

    return(
        <NavBar>
            <Link to="/CreatePetPage">
                <button style={ximgCSS}></button>
            </Link>     
            <div className="title">멤버 검색</div>
            <Link to="/CreatePetPage" >
                <button className="MemberAdd-btn">추가하기</button>
            </Link>
        </NavBar>      
    );
}
export default MemberSearchNav;

const NavBar=styled.nav`
    display:flex;
    width:375px;
    height:50px;
    *{
        position:relative;
    }
    button:hover{
        border-radius:50px;
        box-shadow:0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
    }
    .title{       
        width: 71px;
        height: 26px;
        font-size: 18px;
        left:33%;
        top:40%;
    }
    .MemberAdd-btn{
        background:#F8F8F8;
        color:#A6A6A6;
        cursor:pointer;
        width: 80px;
        height: 23px;
        left:253%;
        top:40%;
        font-size: 16px;
        line-height: 23px;
        border:none;
    }
    .MemberAdd-btn:hover{
        color:#FFA800;
    }
`;