import React, { useState } from "react";
import axiosInstance from '../apis/axios'
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignUp.css';

function SignUpForm() {
    const navigate = useNavigate();
    const initData = Object.freeze({
        nickname: '',
        username: '',
        password1: '', password2: '',
        email: '',
        phone1: '', phone2: '', phone3: ''
    })
    const [data, updateData] = useState(initData)
    const handleChange = (e) => {
        updateData({
            ...data, [e.target.name]: e.target.value.trim(),
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.password1 !== data.password2) {
            return alert("입력된 비밀번호가 서로 다릅니다.")
        }

        axiosInstance
            .post('users/signup/', {
                nickname: data.nickname,
                username: data.username,
                password: data.password1,
                email: data.email,
                phone: data.phone1 + '-' + data.phone2 + '-' + data.phone3,
            })
            .then((res) => {
                navigate('/login');
                console.log(res) // 디버깅용
                console.log(res.data)
            })
    }

    return(
        <form>
            <div className="topBar">
                <Link className="backBtn" to="/login"/>
                <div className="title">회원가입</div>
                <button type="submit" className="subBtn" onClick={handleSubmit}>가입하기</button>
            </div>
            <div className="typeInGroup">
                <div className="typeIn">
                    <p className="inputTitle">이름</p>
                    <input 
                     className="input" 
                     name="username" 
                     placeholder="Name" 
                     onChange={handleChange} 
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">닉네임</p>
                    <input 
                     className="input" 
                     name="nickname"  
                     placeholder="ID" 
                     onChange={handleChange} 
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">비밀번호</p>
                    <input 
                     className="input" 
                     name="password1" 
                     type="password" 
                     placeholder="PW" 
                     onChange={handleChange} 
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">비밀번호 확인</p>
                    <input 
                     className="input" 
                     name="password2"
                     type="password" 
                     placeholder="PW" 
                     onChange={handleChange} 
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">이메일</p>
                    <input 
                     className="input" 
                     name="email" 
                     placeholder="email" 
                     onChange={handleChange} 
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">휴대폰 번호</p>
                    <div className="phonNumber">
                        <input className="input" type="text" name='phone1' placeholder="000" onChange={handleChange} required/>
                        <p>-</p>
                        <input className="input" type="text" name='phone2' placeholder="0000" onChange={handleChange} required/>
                        <p>-</p>
                        <input className="input" type="text" name='phone3' placeholder="0000" onChange={handleChange } required/>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default SignUpForm;