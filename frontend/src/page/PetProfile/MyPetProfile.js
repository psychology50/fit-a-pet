// import React,{useState} from "react";
import React from "react";
// import {Link} from 'react-router-dom';
import ProfileNavBar from "../../Componets/ProfileNavBar";
import MyProfileContainer from "../../Componets/PetProfileContainer";
import styled from 'styled-components';

function MyPetProfile() {
    return (
        <div>
            <ProfileNavBar/>
            <MyProfileContainer/>
            
        </div>
    );
}
export default MyPetProfile;

const div=styled.div`

`;