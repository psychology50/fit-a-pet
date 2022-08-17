import React from "react";
import styled from 'styled-components';


function CycleList(){
    return(
        <Cycle>
            <div className="Cycletitle">
                모든 스케줄
            </div>
            <div className="Cyclecontent">스케줄 리스트들</div>
        </Cycle>
    );
}
export default CycleList;

const Cycle=styled.div`
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