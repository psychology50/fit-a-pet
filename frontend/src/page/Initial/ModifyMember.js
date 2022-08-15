/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from "react";
import MemberSearch from "../../Componets/MemberSearch";
import MemberFormContainer from '../../styles/ModifyMemberForm';


function ModifyMember(){
    const[user,setUser]=useState([]);
    return(
        <MemberFormContainer>
            <MemberSearch user={user} setUser={setUser}/>
        </MemberFormContainer>
    );
}
export default ModifyMember;