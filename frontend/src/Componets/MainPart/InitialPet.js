/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {Link} from 'react-router-dom';
import catlogoimg from '../../image/catlogo.png';
import styled from 'styled-components';

function InitialPet(){
    return(
        <InitialPetBox>
                <img 
                    src={catlogoimg} 
                    style={{
                        width: '90px',
                        height: '90px',
                        left: '37%',
                        top: '10%'
                    }}>
                </img>
                <div className="petcontent"> 
                    등록된 반려동물이 없어요...
                </div>
                <div className="InitialAdd-btn">
                    <Link to="/ModifyMember">
                      <button className="codeInput">코드 입력하기</button>
                    </Link>
                    <Link to="/CreatePet">
                        <button className="newPet">새로 등록하기</button>
                    </Link>
                </div>
                
            </InitialPetBox>
    );
}export default InitialPet;

const InitialPetBox= styled.div`
    background:#FFFFFF;
    position:relative;
    left:8%;
    width: 325px;
    height: 300px;
    padding:15px;
    display:flex;
    flex-direction : column;
    *{
        position:relative;
    }
    .petcontent{
        text-align: center;
        width: 125px;
        height: 46px;
        font-size: 16px;
        top:15%;
        left:32%;
    }
    .InitialAdd-btn{
        display:flex;
        top:23%;
        left:21%;
        gap:10px;
    }
    .codeInput{
        background:#FFFFFF;
        color:#FFA800;
        border: none;
        borderRadius:10px;
        width:100px;
        height:30px;
    }
    .codeInput:hover{
        cursor:pointer;
        box-shadow:0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
    }
    .newPet{
        background:#FFA800;
        color:#FFFFFF;
        border: none;
        borderRadius:10px;
        width:100px;
        height:30px;
    }
    .newPet:hover{
        cursor:pointer;
        box-shadow:0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
    }
`;
