import React from "react";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
// import axiosInstance from "../../apis/axios";
import axiosInstance from "../../apis/axios";
// import styled from 'styled-components';
import '../../styles/Login.css'

function SignInForm(){
    const navigate = useNavigate()
    const initData = Object.freeze({
        nickname: '',
        password: '',
    })

    const [data, updateData] = useState(initData)

    const handleChange = (e) => {
        updateData({
            ...data, [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post('users/signin/', {
                nickname: data.nickname,
                password: data.password
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                navigate('/')
            })
    }

    return(
        <form>
            <div className="login">
                <h3 className="title">로그인</h3>
                <input 
                 className="input id" 
                 type="text" 
                 name="nickname" 
                 placeholder="아이디" 
                 required 
                 onChange={handleChange}/>
                <input
                 className="input pw" 
                 type="password" 
                 name="password" 
                 placeholder="비밀번호" 
                 required 
                 onChange={handleChange}/>
                <button className="ctaBtn submit" type="submit" onClick={handleSubmit}>로그인하기</button>
                {/* connnect find id/pw link */}
                {/* <a href="#" className="findIdPw">아이디/비밀번호 찾기</a> */}
                <div className="bottomSignup">
                    <p>계정이 없으신가요?</p>
                    <Link style={{textDecoration: 'none'}} to="/RegisterPage">
                        <p className="btnSignup">계정만들기</p>
                    </Link>
                </div>
            </div>
            
        </form>
    );
}
export default SignInForm;

// styled-components here
// const name=styled.div`

// `;