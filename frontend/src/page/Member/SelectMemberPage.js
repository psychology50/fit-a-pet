/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from "react";
import SearchMember from "../../Componets/Member/SearchMember";
import MemberFormContainer from '../../styles/ModifyMemberForm';


function ModifyMember(){
    const[user,setUser]=useState([]);
    return(
        <MemberFormContainer>
            <SearchMember user={user} setUser={setUser}/>
        </MemberFormContainer>
    );
}
export default ModifyMember;