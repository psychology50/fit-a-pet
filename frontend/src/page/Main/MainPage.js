/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect, useState,useMemo} from "react";
import MainNav from "../../Componets/Nav/MainNav";
import InitialCycleList from "../../Componets/Cycle/InitialCycleList";
import CycleList from "../../Componets/Cycle/CycleList";
import MainFormContainer from '../../styles/MainForm.js';
import InitialPetList from "../../Componets/Pet/InitialPetList";
import PetList from "../../Componets/Pet/PetList";
import axiosInstance from "../../apis/axios";

function MainPage(){

    const [isCycleIn,setIsCycleIn] = useState(0);//Cycle 보류
    const [isPetIn,setIsPetIn] = useState(0);

    const [data, setData] = useState(null);
    
    useEffect(()=>{
        const handleCheck = () => {
            axiosInstance.get('/pets')
                .then((res) => {
                    console.log(res.data.length);
                    //console.log(res.data[0]);
                    setData(res.data.length);                
                })
        }
        const PetlistCheck=()=>{
            if(data > 0){
            setIsCycleIn(1);//Cycle 보류
            setIsPetIn(1);
            }
        }
        handleCheck();
        PetlistCheck();
    });

    return(
        <MainFormContainer>
            <MainNav />
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


