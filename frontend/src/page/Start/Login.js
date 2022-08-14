import axios from "axios";
import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import { Navigate } from "react-router-dom";

function Login(){
    const[id,setID]=useState('');
    const[pw,setPW]=useState('');
    const [navigate,setNavigate]=useState(false);
    
    const submit = async e=> {
        e.preventDefault();
        console.log(id,pw);
        //const {data}=await axios.post('',{
      //      id,pw
      //  },{withCredentials:true});
      //  axios.defaults.headers.common['Authorization']=`Bearer ${data['token']}`;
        
        setNavigate(true);
    }

    if(navigate){
        return <Navigate to="/Main"/>
    }

    return(
        <form onSubmit={submit}>
            <div className="login">
                <h3 className="title">
                    로그인
                </h3>
                <input className="input id" type="id" placeholder="아이디"  onChange={e=>setID(e.target.value)}/>
                <input className="input pw" type="pw" placeholder="비밀번호"  onChange={e=>setPW(e.target.value)}/>
                <button className="ctaBtn submit" type="submit">로그인하기</button>
                {/* connnect find id/pw link */}
                <a href="#" className="findIdPw">아이디/비밀번호 찾기</a>
                <div className="bottomSignup">
                    <p>계정이 없으신가요?</p>
                    <Link style={{textDecoration: 'none'}} to="/SignUp">
                        <p className="btnSignup">계정만들기</p>
                    </Link>
                </div>
            </div>
            
        </form>
    );
}
export default Login;