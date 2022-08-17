/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import styled from 'styled-components';
import logoimg from '../../image/pit-a-pet-logo2.png';
import alarmimg from '../../image/alarm.png';
import settingimg from '../../image/setting.png';
import userimg from '../../image/userimg.png';
import {Link} from 'react-router-dom';

function Nav(){
    const alarmimgCSS={
        background:`url(${alarmimg})`,
        backgroundSize:'cover',
        position: 'relative',
        width: '24px',
        height: '24px',
        left: '48%',
        top: '6px',
        border:'none'
    }
    const settingimgCSS={
        background:`url(${settingimg})`,
        backgroundSize:'cover',
        position: 'relative',
        width: '24px',
        height: '24px',
        left: '52%',
        top: '6px',
        border:'none'
    }
    const userimgCSS={
        background:`url(${userimg})`,
        backgroundSize:'cover',
        position: 'relative',
        width: '40px',
        height: '40px',
        top: '10px',
        border:'none'
    }

    return(
        <NavBar>
            <Link to="/MyProfile">
                <button style={userimgCSS}></button>
            </Link>
            <img
            src={logoimg} 
            style={{
                position: 'relative',
                width: '90px',
                height: '50px',
                left: '27%',
                top: '20px'}}>
            </img>
           <button style={alarmimgCSS}></button>
           <button style={settingimgCSS}> </button>
        </NavBar>
    );
}
export default Nav;

const NavBar=styled.nav`
    background:#FFFFFF;
    width:375px;
    height:80px;
    padding:15px;
    button:hover{
        cursor:pointer;
        border-radius:50%;
        box-shadow:0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
    }
`;

