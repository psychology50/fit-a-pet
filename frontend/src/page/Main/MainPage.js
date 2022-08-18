/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import MainNav from "../../Componets/Nav/MainNav";
import InitialCycleList from "../../Componets/Cycle/InitialCycleList";
import CycleList from "../../Componets/Cycle/CycleList";
import MainFormContainer from '../../styles/MainForm.js';
import InitialPetList from "../../Componets/Pet/InitialPetList";
import PetList from "../../Componets/Pet/PetList";

function MainPage(){
    const isCycleIn = 1;
    const isPetIn = 1;

    return(
        <MainFormContainer>
            <MainNav/>
            {/* 만약 유저가 Cycle 등록 했으면 CycleList 아니면 InitialCycleList 부르기 */}
            <>
            {
                isCycleIn === 1
                ? <CycleList/>
                : <InitialCycleList/>
            }
            </>
            <div style={{
                fontWeight: '700',
                fontSize: '19px',
                paddingLeft:'15px'
            }}>나의 반려동물 리스트</div>

            {/* 만약 유저가 pet을 가지고 있으면 PetList 컴포넌트 아니면 InitialPetList 부르기*/}
            <>
            {
                isPetIn === 1
                ? <PetList/>
                : <InitialPetList/>
            }
            </>
        </MainFormContainer>
    );
}
export default MainPage;


