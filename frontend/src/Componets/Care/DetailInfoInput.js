import React from "react";
import styled from 'styled-components';

const Time = [
	{ value: "AM", name: "오전" },
	{ value: "PM", name: "오후" }
];

const TimeBox = (props) => {
	return (
		<select style={{
            width: '60px',
            height:'30px',
            background:'#F8F8F8',
            border:'none'
        }}>
			{props.options.map((option) => (
				<option
					key={option.value}
					value={option.value}
				>
					{option.name}
				</option>
			))}
		</select>
	);
};

function DetailInfoInput(){
    return(
        <DetailInfoInputBox>
            <div className="BtnName">
                <div>버튼 이름</div>
                <input placeholder="이름 입력"></input>
            </div>
            <div className="TimeOption">
                <div>시간</div>
                <TimeBox options={Time}></TimeBox>
            </div>
            <div className="TimeSet">
                <input placeholder="HH"></input>
                <div> : </div>
                <input placeholder="MM"></input>
            </div>
        </DetailInfoInputBox>
    );
}
export default DetailInfoInput;
const DetailInfoInputBox =styled.div`
    display:flex;
    gap:20px; 

    *{
        position:relative;
    }
    input{ 
        border:none;
        background:#F8F8F8;
        height:30px;
    }
    .BtnName>input{
        width:80px;
    }
    .BtnName>div{
        width:80px;
    }
    .TimeSet{
        display:flex;
        margin-top:10%;
    }
    .TimeSet>input{
        width:39px;
         text-align: center;  
    }
`;
