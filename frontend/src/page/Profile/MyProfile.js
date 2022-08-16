// import React,{useState} from "react";
import React from "react";
// import {Link} from 'react-router-dom';
import ProfileNavBar from "../../Componets/ProfileNavBar";
import MyProfileContainer from "../../Componets/MyProfileContainer";
import styled from 'styled-components';

function MyProfile() {
    return (
        <div>
            <ProfileNavBar/>
            <MyProfileContainer/>
            
        </div>
    );
}
export default MyProfile;

const div=styled.div`

`;