// import React,{useState} from "react";
import React from "react";
// import {Link} from 'react-router-dom';
import PetProfileNav from "../../Componets/Nav/PetProfileNav";
import PetInfo from "../../Componets/Pet/PetInfo";
import styled from 'styled-components';

function PetProfile() {
    return (
        <div>
            <PetProfileNav/>
            <PetInfo/>
            
        </div>
    );
}
export default PetProfile;

const div=styled.div`

`;