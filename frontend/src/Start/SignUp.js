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
            <div>
                회원가입
            </div>
            <input type="name" placeholder="Name" onChange={e=>setName(e.target.value)} />
            <input type="id" placeholder="ID" onChange={e=>setID(e.target.value)}/>
            <input type="pw" placeholder="PW" onChange={e=>setPW(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    );
}
export default SignUp;