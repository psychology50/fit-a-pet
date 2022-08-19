import React,{useState} from "react";
import styled from 'styled-components';

function ModifyUserInfo(){
    const userimg={
        width: '134px',
        height: '134px',
        borderRadius:'50%',
        left:'31%',
        position: 'relative'
    }
    const sampleimg={
        width: '134px',
        height: '134px',
        borderRadius:'50%',
        background:'#A6A6A6',
        left:'31%',
        position: 'relative'
    }

    const [fileImage, setFileImage] = useState("");

    const saveFileImage = (e) => {
        // 첨부한 사진 링크 가져오기
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };
    return(
        <UserEditContainer>
            <div className="userImage" >
                {fileImage ? (
                    <img className="sampleImg" alt="sample" src={fileImage} style={userimg}/>
                  ) : (
                    <div className="NosampleImg" style={sampleimg}></div>
                  )}
                  <input
                    type="file"
                    className="imgInput"
                    id="weatherImg"
                    name="Inputfile"
                    style={{
                        marginTop:'10px',
                        left:'28%',
                        position: 'relative'
                    }}
                    onChange={saveFileImage}
                ></input>
            </div>
            <UserInfoEditContainer>
                <div className="typeInGroup">
                    <div className="typeIn">
                        <p className="inputTitle">이름</p>
                        <input 
                        className="input" 
                        name="username" 
                        placeholder="Name" 
                        //  onChange={handleChange} 
                        // ref={el => inputRef.current['username'] = el}
                        // required
                        />
                    </div>
                    <div className="typeIn">
                        <p className="inputTitle">닉네임</p>
                        <input 
                        className="input" 
                        name="nickname"  
                        placeholder="ID" 
                        //  onChange={handleChange} 
                        // ref={el => inputRef.current['nickname'] = el}
                        // required
                        />
                    </div>
                    <div className="typeIn">
                        <p className="inputTitle">이메일</p>
                        <input 
                        className="input" 
                        name="email" 
                        placeholder="email" 
                        //  onChange={handleChange} 
                        // ref={el => inputRef.current['email'] = el}
                        // required
                        />
                    </div>
                    <div className="typeIn">
                        <p className="inputTitle">휴대폰 번호</p>
                        <div className="phonNumber">
                            <input 
                            className="input" 
                            type="text" 
                            name='phone1' 
                            placeholder="010" 
                            // ref={el => inputRef.current['phone1'] = el}
                            />
                            <p>-</p>
                            <input 
                            className="input" 
                            type="text" 
                            name='phone2' 
                            placeholder="0000" 
                            // ref={el => inputRef.current['phone2'] = el}
                            />
                            <p>-</p>
                            <input 
                            className="input" 
                            type="text" 
                            name='phone3' 
                            placeholder="0000" 
                            // ref={el => inputRef.current['phone3'] = el}
                            />
                        </div>
                    </div>
                </div>
            </UserInfoEditContainer>
        </UserEditContainer>
    );
}
export default ModifyUserInfo;

const UserEditContainer = styled.div`
    width: 100%;
    height:100%;
    padding-top: 24px;
`;

const UserInfoEditContainer=styled.div`
`;