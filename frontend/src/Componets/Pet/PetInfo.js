import React from "react";
import styled from 'styled-components';
import profileImage from '../../assets/profileImage.png'


function PetInfo(){

    
    return(
        <MyProfile>
            <div className="profileInfo">
                <img className="profileImage" src={profileImage} alt="profileImage" />
                <div className="userId">
                    <strong>김수한무거북이와두루...</strong>
                    <p>@yourid</p>
                </div>
            </div>
            <ul className="profileage">
                <li className="sex">
                    <label>성별</label>
                    <strong className="sexValue"> 수컷 </strong>
                </li>
                <li className="age">
                    <label>나이</label>
                    <strong className="ageValue"> 2살 </strong>
                </li>
                <li className="birthday">
                    <label>생일</label>
                    <strong className="birthdayValue"> 2019.2.19 </strong>
                </li>
            </ul>
        </MyProfile>
        
    );
}
export default PetInfo;

const MyProfile=styled.div`
    /* width: 295px; */
    margin-bottom: 16px;
    padding: 24px 0;
    height: auto;
    background-color : #ffffff;
    /* background-color : #FFA800; */

    .profileInfo{
        margin: 0 40px;
        display:flex;
        align-items: end;
        gap: 12px;
    }
    .profileImage{
        width: 110px;
        height: 110px;
        radius : 100px;
    }
    .userId{
        line-height: 20px;
    }
    strong {
        font-size: 20px;
        font-weight: 700;
    }
    p{
        font-size: 14px;
        color : #5A5A5A;
        font-weight: 400;
    }
    li{
        list-style: none;
    }
    label{
        font-size: 12px;
        color: #656565;
    }
    .profileage{
        /* width: 295px; */
        margin: 20px 40px;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
    }
    li{
        display:flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
    }
    li>strong{
        font-size: 16px;
    }
    .sex{
        border-right: 1px solid #EAEAEA;
    }
    .birthday{
        border-left: 1px solid #EAEAEA;
    }

`;