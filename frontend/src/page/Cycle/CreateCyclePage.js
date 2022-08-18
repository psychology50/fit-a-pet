import React,{useCallback, useState} from "react";
import CreateCycleContainer from "../../styles/CreateCycleContainer";
import BtnContent from "../../Componets/Cycle/BtnContent";
import CycleChangeBtn from "../../Componets/Cycle/CycleChangeBtn";
import Nav from "../../Componets/Nav/Nav";
import styled from 'styled-components';


const CreateCyclePage=()=>{
    const onSelect=useCallback((btn)=>setBtn(btn),[]);
    const[btn,setBtn]=useState("DayBtn");
    
    return(
        <CreateCycleContainer>
            <Nav title={"새로운 케어"} btnName={"등록하기"} BackLink={"/PetProfile"} EndLink={"/PetProfile"}/>
            <CycleChangeBtn btn={btn} onSelect={onSelect}/>
            <BtnContent btn={btn}/>
        </CreateCycleContainer>

    );
}
export default CreateCyclePage;
