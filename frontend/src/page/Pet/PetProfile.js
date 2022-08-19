// import React,{useState} from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import PetProfileNav from "../../Componets/Nav/PetProfileNav";
import PetInfo from "../../Componets/Pet/PetInfo";
import CycleInfo from "../../Componets/Cycle/CycleInfo";
import PetProfileTap from "../../Componets/Pet/PetProfileTap";
// import styled from 'styled-components';

function PetProfile(props) {
  const location = useLocation();
  const data = location.state.data;

  console.log(location.state.data, "location");
  return (
    <div>
      <PetProfileNav />
      <PetInfo name={data.pet_name} birth={data.birthday} code={data.code} />
      <CycleInfo />
      <PetProfileTap />
    </div>
  );
}
export default PetProfile;

// const div=styled.div`
//     background-color: #F5F5F5;

// `;
