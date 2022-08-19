import React from "react";
// import { useState } from "react";
// import {Link, useNavigate} from 'react-router-dom';
// import axiosInstance from "../apis/axios";
import styled from 'styled-components';
import backBtn from '../../assets/backBtn_white.svg';
import settings from '../../assets/settings.svg';

function PetProfileNav(){

    
    return(
        <ProfileNavBarContainer>
            <img className="backBtn" src={ backBtn} />
            <img className="settings" src={ settings} />
        </ProfileNavBarContainer>
        
    );
}
export default PetProfileNav;

const ProfileNavBarContainer=styled.div`
    width: auto;
    height: 48px;
    background-color : #FFA800;
    display : flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: 40px;
        height : 40px;
        object-fit: none;
        cursor:pointer;
    }
`;