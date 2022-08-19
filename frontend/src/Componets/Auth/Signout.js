import React, {useState} from 'react';
import styled from 'styled-components';
import SignoutButton from './SignoutButton';

function Signout (){
    const [trigger, setTrigger] = useState(false);
    const logout = {
        out: <SignoutButton />
    }
    const handleClickButton = () => {
        setTrigger(true);
    }
    return (
        <SignOutContainer>
            {/* <input type="button" value="로그아웃" onClick={event =>  window.location.href='./SignoutButton.js'} /> */}
            <input type="button" value="로그아웃" onClick={handleClickButton} />
            {trigger && logout.out}
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
        cursor: pointer;
    }
`;