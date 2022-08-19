import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';


function PetMember(){

    return(
        <PetMemberBox>
            <hr />
            <div className="PetmemberTitle">
                반려동물 관리 멤버
            </div>
            <Link to="/SelectMemberPage">
                <button className="Memberadd-btn">+ 멤버 추가하기</button>
            </Link>
        </PetMemberBox>
    );
}
export default PetMember;

const PetMemberBox=styled.div`
    width: 310px;
    height: auto;
    *{
        position:relative;
    }
    hr{
        background:#EAEAEA;
        border: 1px solid #EAEAEA;
        width:330px;
        left:9%;
    }
    .PetmemberTitle{
        width: 149px;
        height: 28px;
        font-weight: 500;
        font-size: 19px;
        left:14%;
        top:3%;
    }
    .Memberadd-btn{
        background:#FFFFFF;
        font-size: 16px;
        color: #A6A6A6;
        border:1px solid ;
        width: 330px;
        height: 30px;
        left:10%;
        top:25%;
        cursor:pointer;
    }
    .Memberadd-btn:hover{
        background:#F5F5F5;
    }
`;