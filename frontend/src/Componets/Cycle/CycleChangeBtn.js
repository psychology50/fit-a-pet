import React,{useState} from "react";
import styled,{css}from 'styled-components';

const topbtn = [
    {
        name: 'DayBtn',
        text: '요일'
    },
    {
        name: 'TermBtn',
        text: '활동 간격'
    },
];
const CycleChangeBtn=({onSelect,btn})=>{
    return(
            <div className="CycleBtns" style={{display:'flex',position:'relative',left:'26%',top:'6%'}}>
                {topbtn.map(c=>(
                    <CycleBtn key={c.name} active={btn===c.name} onClick={()=>onSelect(c.name)}>{c.text}</CycleBtn>
                ))}
            </div>

    );
}
export default CycleChangeBtn;

const CycleBtn=styled.div`
    cursor: pointer;
    white-space: pre;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    padding: 10px;
    border-radius: 10px;
    height:15px;
    color:#A6A6A6;
    &:hover{
        color: #FFA800;
    }
    ${props => 
        props.active && css`
        font-weight: 600;
        color: #FFA800;
        &:hover{
        color: #FFA800;
        }
    `}
    &+&{
        margin-left: 2rem;
    }
`;
