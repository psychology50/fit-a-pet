import React, { useCallback, useState } from "react";
import SignUpForm from '../../Componets/Auth/SignupForm';
import BackBtn from "../../Componets/Btn/BackBtn";
import SubmitBtn from '../../Componets/Btn/SubmitBtn';
import '../../styles/SignUp.css';

function RegisterPage(){
    const initData = Object.freeze({
        nickname: '',
        username: '',
        password1: '', password2: '',
        email: '',
        phone1: '', phone2: '', phone3: ''
    })
    const [data, updateData] = useState(initData)
    const handleChange = useCallback((e) => {
        updateData({
            ...data, [e.target.name]: e.target.value.trim(),
        });
    }, [data])
    
    return (
        <>
        <div className="topBar">
            <BackBtn url="/loginPage"/>
            <div className="title">회원가입</div>
            <SubmitBtn data={data} />
        </div>
        <SignUpForm handleChange={handleChange}></SignUpForm>
        </>
    )
}
export default RegisterPage;
