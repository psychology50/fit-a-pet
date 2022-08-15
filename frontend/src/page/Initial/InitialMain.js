/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Nav from "../../Componets/Nav";
import CycleList from "../../Componets/CycleList";
import MainFormContainer from '../../styles/MainForm.js';
import InitialPet from "../../Componets/InitialPet";

function InitialMain(){
    return(
        <MainFormContainer>
            <Nav/>
            <CycleList/>
            <div style={{
                fontWeight: '700',
                fontSize: '19px',
                paddingLeft:'15px'
            }}>나의 반려동물 리스트</div>
            <InitialPet/>
        </MainFormContainer>
    );
}
export default InitialMain;

