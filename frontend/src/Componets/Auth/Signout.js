import React from 'react';
import styled from 'styled-components';

function Signout (){

    return (
        <SignOutContainer>
            <input type="bttton" value="로그아웃" />
        </SignOutContainer>
    )
}
export default Signout;

const SignOutContainer=styled.div`
    input{
        width: 142px;
        height: 42px;
        border: none;
        color: #FFA800;
        background-color: #fff;
        text-align: center;
        line-height: 42px;
        border-radius:5px;
        box-shadow: 0px 2px 12px -3px rgba(0, 0, 0, 0.1);
        margin-left: 40px;
        margin-bottom: 44px;
    }
`;