import React from "react";
import styled from 'styled-components';


function InitialCycleList(){
    return(
        <InitialCycle>
            <div className="Cycletitle">
                모든 스케줄
            </div>
            <div className="Cyclecontent">등록된 반려동물이 없어 예정된 스케줄을 조회할 수 없어요.</div>
        </InitialCycle>
    );
}
export default InitialCycleList;

const InitialCycle=styled.div`
    background:#FFFFFF;
    width: 375px;
    height: 177px;
    padding:15px;
    .Cycletitle{
        width: 92px;
        height: 28px;
        font-weight: 700;
        font-size: 19px;
    }
    .Cyclecontent{
        text-align: center;
        white-space: pre-wrap;
        position:relative;
        width: 190px;
        height: 40px;
        font-size:14px;
        color:#A6A6A6;
        left:25%;
        top:20%;
    }
`;