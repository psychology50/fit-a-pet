// import React,{useState} from "react";
import React from "react";
// import {Link} from 'react-router-dom';
import ProfileNavBar from "../../Componets/ProfileNavBar";
import MyProfileContainer from "../../Componets/PetProfileContainer";
import MyPetCare from '../../Componets/MyPetCare';
import styled from 'styled-components';

function MyPetProfile() {
    return (
        <div>
            <ProfileNavBar/>
            <MyProfileContainer/>
            <MyPetCare/>
        </div>
    );
}
export default MyPetProfile;

const div=styled.div`

`;