import React from "react";
import ModifyUserInfo from '../../Componets/Auth/ModifyUserInfo';
import Nav from "../../Componets/Nav/Nav";
import Signout from "../../Componets/Auth/Signout";



function MyProfile(){
    return(
        <>
            <Nav title={"내 정보 관리"} btnName={"등록하기"} BackLink={"/MainPage"} EndLink={"/MainPage"}/>
            <ModifyUserInfo/>
            <Signout/>
        </>
            
    );
}
export default MyProfile;

