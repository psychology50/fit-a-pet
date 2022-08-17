/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import MainNav from "../../Componets/Nav/MainNav";
import CycleList from "../../Componets/Cycle/CycleList";
import MainFormContainer from '../../styles/MainForm.js';
import InitialPetList from "../../Componets/Pet/InitialPetList";

function Main(){
    return(
        <MainFormContainer>
            <MainNav/>
            <CycleList/>
            <div style={{
                fontWeight: '700',
                fontSize: '19px',
                paddingLeft:'15px'
            }}>나의 반려동물 리스트</div>
            {/* 만약 유저가 pet을 가지고 있으면 Petlist 컴포넌트 아니면 InitialPet 부르기*/}
            
            <InitialPetList/>
        </MainFormContainer>
    );
}
export default Main;

