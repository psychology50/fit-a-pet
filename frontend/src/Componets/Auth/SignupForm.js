import React from "react";
import '../../styles/SignUp.css';

function SignUpForm({inputRef}) { 
    return(
        <div className="SignUpForm">
            <div className="typeInGroup">
                <div className="typeIn">
                    <p className="inputTitle">이름</p>
                    <input 
                     className="input" 
                     name="username" 
                     placeholder="Name" 
                    //  onChange={handleChange} 
                    ref={el => inputRef.current['username'] = el}
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">닉네임</p>
                    <input 
                     className="input" 
                     name="nickname"  
                     placeholder="ID" 
                    //  onChange={handleChange} 
                    ref={el => inputRef.current['nickname'] = el}
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
                    //  onChange={handleChange} 
                    ref={el => inputRef.current['password1'] = el}
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
                    //  onChange={handleChange} 
                    ref={el => inputRef.current['password2'] = el}
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">이메일</p>
                    <input 
                     className="input" 
                     name="email" 
                     placeholder="email" 
                    //  onChange={handleChange} 
                    ref={el => inputRef.current['email'] = el}
                     required
                    />
                </div>
                <div className="typeIn">
                    <p className="inputTitle">휴대폰 번호</p>
                    <div className="phonNumber">
                        <input 
                         className="input" 
                         type="text" 
                         name='phone1' 
                         placeholder="000" 
                         ref={el => inputRef.current['phone1'] = el}/>
                        <p>-</p>
                        <input 
                         className="input" 
                         type="text" 
                         name='phone2' 
                         placeholder="0000" 
                         ref={el => inputRef.current['phone2'] = el}/>
                        <p>-</p>
                        <input 
                         className="input" 
                         type="text" 
                         name='phone3' 
                         placeholder="0000" 
                         ref={el => inputRef.current['phone3'] = el}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(SignUpForm);