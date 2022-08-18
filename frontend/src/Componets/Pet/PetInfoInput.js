
import React from "react";
import styled from 'styled-components';


const genders = [
	{ value: "male", name: "male" },
	{ value: "female", name: "female" }
];

const GenderBox = (props) => {
	return (
		<select style={{
            width: '295px',
            height:'30px'
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

function PetInfoInput(){

    return(
        <PetinfoBox>
            <div className="Petname">
                <div>이름</div>
                <input type="text" ></input>
            </div>
            <div className="Petgender">
                <div>성별</div>
                <GenderBox options={genders} ></GenderBox>
            </div>
            <div className="Petbirth">
                <div>생년월일</div>
                <PetbirthBox>
                    <input type="text" placeholder="년"></input>
                    <input type="text" placeholder="월"></input>
                    <input type="text"placeholder="일"></input>
                </PetbirthBox>
            </div>
        </PetinfoBox>
    );
}
export default PetInfoInput;



const PetinfoBox=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    position: relative;
    width: 310px;
    height: 220px;
    left: 10%;
    top: 1%;
    padding:10px;
    *{
        border:none;
    }
    input{
        width: 290px;
        height:25px;
        margin-top:5px;
    }
`;

const PetbirthBox=styled.div`
    display: flex;
    gap: 10px;
    input{
        width: 88px;
    }
`;