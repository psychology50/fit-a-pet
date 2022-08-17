import React, { useMemo } from "react";
import styled from "styled-components";

import CycleDayInput from "./CycleDayInput";
import CycleTermInput from "./CycleTermInput";

const BtnContent =(btn)=>{
    const Cycleitem=useMemo(()=>{;
        if(!btn)
            return null;
        switch(btn.btn){
            case 'DayBtn':
                return(   
                        <CycleDayInput/>           
                )
            case 'TermBtn':
                return(            
                        <CycleTermInput/>       
                )
            default:
                return null;
        }
    },[btn])
    return <CycleInputBox>
        {Cycleitem}
    </CycleInputBox>
}
export default BtnContent;
const CycleInputBox = styled.div`
    display:flex;
    flex-direction : column;
    gap:10px;
    width: 295px;
    height: 194px;
    position:relative;
    top:8%;
    left:11%;
`;