import React,{useState} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import backimg from "../../image/back-button.png";

function CreatePetNav(){
    const backimgCSS={
        background:`url(${backimg})`,
        backgroundSize:'cover',
        position: 'relative',
        width: '10px',
        height: '23px',
        left:'5%',
        top: '40%',
        border:'none'
    }

    return(
        <NavBar>
            <Link to="/Main">
                <button style={backimgCSS}></button>
            </Link>     
            <div className="title">새 반려동물 프로필</div>
            <Link to="/Main" >
                <button className="PetAdd-btn">등록하기</button>
            </Link>
        </NavBar>      
    );
}
export default CreatePetNav;

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
        width:160px;
        height:26px;
        font-size: 18px;
        left:27%;
        top:40%;
    }
    .PetAdd-btn{
        background:#F8F8F8;
        color:#A6A6A6;
        cursor:pointer;
        width: 80px;
        height: 23px;
        left:180%;
        top:40%;
        font-size: 16px;
        line-height: 23px;
        border:none;

    }
    .PetAdd-btn:hover{
        color:#FFA800;
    }
`;