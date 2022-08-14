import React, { useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router";

function SignUp(){
    const[name,setName]=useState('');
    const[id,setID]=useState('');
    const[pw,setPW]=useState('');
    const [navigate,setNavigate]=useState(false);
    
    const submit = async e=> {
        e.preventDefault();
        console.log(name,id,pw);
        //await axios.post('',{
          //  name,id,pw
        //});
        setNavigate(true);
    }

    if(navigate){
        return <Navigate to="/login"/>
    }

    return(
        <form onSubmit={submit}>
            <div className="topBar">
                <button className="backBtn"></button>
                <div className="title">회원가입</div>
                <button type="submit" className="subBtn">가입하기</button>
            </div>
            <div className="typeInGroup">
                <div className="typeIn">
                    <p className="inputTitle">닉네임</p>
                    <input className="input" type="name" placeholder="Name" onChange={e=>setName(e.target.value)} />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">아이디</p>
                    <input className="input" type="id" placeholder="ID" onChange={e=>setID(e.target.value)}/>
                </div>
                <div className="typeIn">
                    <p className="inputTitle">비밀번호</p>
                    <input className="input" type="pw" placeholder="PW" onChange={e=>setPW(e.target.value)}/>
                </div>
                <div className="typeIn">
                    <p className="inputTitle">비밀번호 확인</p>
                    <input className="input" type="pw" placeholder="PW" onChange={e=>setPW(e.target.value)}/>
                </div>
                <div className="typeIn">
                    <p className="inputTitle">이메일</p>
                    <input className="input" type="email" placeholder="email" onChange={e=>setPW(e.target.value)}/>
                </div>
                <div className="typeIn">
                    <p className="inputTitle">휴대폰 번호</p>
                    <div className="phonNumber">
                        <input className="input" type="text" placeholder="000" onChange={e=>setPW(e.target.value)}/>
                        <p>-</p>
                        <input className="input" type="text" placeholder="0000" onChange={e=>setPW(e.target.value)}/>
                        <p>-</p>
                        <input className="input" type="text" placeholder="0000" onChange={e=>setPW(e.target.value)}/>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default SignUp;