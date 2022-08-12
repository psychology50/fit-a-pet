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
            <div>
                로그인
            </div>
            <input type="id" placeholder="ID"  onChange={e=>setID(e.target.value)}/>
            <input type="pw" placeholder="PW"  onChange={e=>setPW(e.target.value)}/>
   
            <Link to="/SignUp">
                <p>회원가입</p>
            </Link>
            <button type="submit">Login</button>
        </form>
    );
}
export default Login;