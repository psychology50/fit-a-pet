// import React,{useState} from "react";
import React from "react";
// import {Link} from 'react-router-dom';
import PetProfileNav from "../../Componets/Nav/PetProfileNav";
import PetInfo from "../../Componets/Pet/PetInfo";
import PetList from "../../Componets/Pet/PetList";
import PetProfileTap from "../../Componets/Pet/PetProfileTap";
// import styled from 'styled-components';

function PetProfile() {
    return (
        <div>
            <PetProfileNav/>
            <PetInfo/>
            <PetList/>
            <PetProfileTap/>
        </div>
    );
}
export default PetProfile;


// const div=styled.div`
//     background-color: #F5F5F5;

// `;