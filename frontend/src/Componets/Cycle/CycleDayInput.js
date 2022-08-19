import React,{useState,useEffect} from "react";
import styled from 'styled-components';
import DetailInfoInput from "../Care/DetailInfoInput";

const topbtn = [
    {
        num:1,
        text:'일'
    },
    {
        num:2,
        text: '월'
    },
    {
        num:3,
        text: '화'
    },
    {
        num:4,
        text: '수'
    },
    {
        num:5,
        text: '목'
    },
    {
        num:6,
        text: '금'
    },
    {
        num:7,
        text: '토'
    },
];

function CycleDayInput(){
    //요일 체크박스
    const[isChecked,setIsChecked]=useState(false);//체크 여부
    const[checkedItem,setCheckedItem]=useState(new Set());//체크된 요소들

    const checkHandler=({target})=>{ //체크 여부 파악
        setIsChecked(!isChecked);
        checkedItemHandler(target.parentNode,target.value,target.checked);
    }
    const checkedItemHandler=(box,id,isChecked)=>{
        if(isChecked){//체크 되었을 때
            checkedItem.add(id);//체크시 삽입
            setCheckedItem(checkedItem);//스타일 변경
            box.style.color="#FFA800";
        }else if(!isChecked && checkedItem.has(id)){//체크 안되어있거나, 체크 두번한 경우
            checkedItem.delete(id);
            setCheckedItem(checkedItem);
            box.style.color="#FFFFFF";
        }
        return checkedItem;
    }

    //시간 설정 체크박스
    const[timeisChecked,setTimeIsChecked]=useState(false);
    const TimeHandler=({target})=>{
        setTimeIsChecked(!timeisChecked);
    }

    //콘솔창 확인
    useEffect(() => {
        console.log(checkedItem);
      }, [isChecked]);

    return(
        <CycleDayInputBox>
            <div>케어 제목</div>
            <input style={{background:'#F8F8F8',border:'none',height:'25px'}} placeholder="제목 입력"></input>
            <div>요일</div>
                <div className="CycleBtns" style={{display:'flex',position:'relative',left:'1%',top:'1%'}}>
                    {topbtn.map((item)=>(
                        <DayInputBtn>
                            <label key={item.id} >
                                <input type="checkbox" value={item.text} onChange={(e)=>checkHandler(e)}/>
                                    <div>{item.text}</div>
                            </label>
                        </DayInputBtn>))}
                </div>
            <div style={{top:'10%'}}>
                <input id="timecheck" type="checkbox" style={{width:'15px'}} onChange={(e)=>TimeHandler(e)}></input>
                <label id="check2" for="timecheck">시간 설정</label> 
                <div style={{position:'relative'}}>{timeisChecked===true&&<DetailInfoInput/>}</div>
            </div>    
        </CycleDayInputBox>

    );
}
export default CycleDayInput;

const CycleDayInputBox=styled.div`
    *{
        position:relative;
        margin-top:2%;
    }
`;
const DayInputBtn=styled.div`
    cursor: pointer;
    white-space: pre;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    padding: 8px;
    border-radius: 50px;
    width:20px;
    color:#FFFFFF;
    background:#A6A6A6;
    input{
        display:none;
    }
    &:hover{
        color: #FFA800;
    }
    &+&{
        margin-left: 5px;
    }
`;