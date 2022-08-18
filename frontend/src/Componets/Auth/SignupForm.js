import React from "react";
import '../../styles/SignUp.css';

function SignUpForm({handleChange}) {
    return(
        <div className="SignUpForm">
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
        </div>
    );
}
export default React.memo(SignUpForm);