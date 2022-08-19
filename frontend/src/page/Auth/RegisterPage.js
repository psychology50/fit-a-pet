import React, { useCallback, useEffect, useRef, useState } from "react";
import SignUpForm from '../../Componets/Auth/SignupForm';
import BackBtn from "../../Componets/Btn/BackBtn";
import SubmitBtn from '../../Componets/Btn/SubmitBtn';
import '../../styles/SignUp.css';

function RegisterPage(){
    // const initData = Object.freeze({
    //     nickname: '',
    //     username: '',
    //     password1: '', password2: '',
    //     email: '',
    //     phone1: '', phone2: '', phone3: ''
    // })
    // const [data, updateData] = useState(initData)
    // const handleChange = useCallback((e) => {
    //     updateData({
    //         ...data, [e.target.name]: e.target.value.trim(),
    //     });
    // }, [data])
    
    const inputRef = useRef({})
    useEffect(() => {
        inputRef.current['nickname'].value = '';
        inputRef.current['username'].value = '';
        inputRef.current['password1'].value = '';
        inputRef.current['password2'].value = '';
        inputRef.current['email'].value = '';
        inputRef.current['phone1'].value = '';
        inputRef.current['phone2'].value = '';
        inputRef.current['phone3'].value = '';
    }, [])

    return (
        <>
        <div className="topBar">
            <BackBtn url="/loginPage"/>
            <div className="title">회원가입</div>
            <SubmitBtn current={inputRef.current} />
        </div>
        <SignUpForm inputRef={inputRef}></SignUpForm>
        </>
    )
}
export default RegisterPage;
