import React,{useState,useEffect} from "react";
import styled from 'styled-components';
import DetailInfoInput from "../Care/DetailInfoInput";


function CycleTermInput(){
     //시간 설정 체크박스
     const[timeisChecked,setTimeIsChecked]=useState(false);
     const TimeHandler=({target})=>{
         setTimeIsChecked(!timeisChecked);
     }

    return(
        <CycleTermInputBox>
            <div>케어 제목</div>
            <input style={{background:'#F8F8F8',border:'none',height:'25px'}} placeholder="제목 입력"></input>
            <div>활동 간격</div>
            <div style={{display:'flex',gap:'5px'}}>
 
                <input placeholder="숫자입력" style={{background:'#F8F8F8',width:'80px',border:'none',textAlign:'center'}}></input>
                <div> 일</div>
            </div>
            <div style={{top:'10%'}}>
                <input id="timecheck" type="checkbox" style={{width:'15px'}} onChange={(e)=>TimeHandler(e)}></input>
                <label id="check2" for="timecheck">시간 설정</label> 
                <div style={{position:'relative'}}>{timeisChecked===true&&<DetailInfoInput/>}</div>
            </div>    
        </CycleTermInputBox>
    )
}
export default CycleTermInput;

const CycleTermInputBox=styled.div`
*{
    position:relative;
    margin-top:2.8%;
}
`;