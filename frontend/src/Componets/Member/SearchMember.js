/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect, useState} from "react";
import axios from "axios";
import styled from 'styled-components';
import searchimg from '../../image/search-line.png';
import Nav from "../Nav/Nav";

function SearchMember({user,setUser}){
    useEffect(()=>{
        axios.get("/data/user.json").then((res)=>{
            setUser(res.data.user);
        })
    },[setUser]);

    return(
        <MemberSearchBox>
            <Nav title={"멤버 검색"} btnName={"추가하기"} BackLink={"/CreatePetPage"} EndLink={"/CreatePetPage"}/>
            <div className="user-search">
                <img 
                src={searchimg} 
                style= {{
                width: '24px',
                height: '24px',
                position: 'relative',  
                left: '8%',
                top: '12%' 
                }}></img>
                <input className="userid-input"type="text" placeholder="아이디를 검색하세요." onChange={(e)=>this.searchSpace(e)}></input>
            </div>      
            <UserlistBox>
                {user.map((user)=>{
                    return( 
                        <form className="userlistForm">  
                            <div>그림</div>
                            <div className="userinfo">   
                                <div key="{user}" className="u-Nickname" >{user.nickname}</div>
                                <div key="{user-id}" className="u-Id">{user.user_id}</div>
                            </div>
                            <div className="userCheck">
                                <input type="checkbox" id="u-check" ></input>                              
                                <label for="u-check"></label>
                            </div>
                        </form>
                            
                    );
                })}
            </UserlistBox>
        </MemberSearchBox>
    );
}
export default SearchMember;
const MemberSearchBox=styled.div`
    width: 375px;
    height: 812px;
    display:flex;
    flex-direction : column;
    gap:20px;
    .user-search{
        position:relative;
        left:3%;
    }
    .userid-input{
        width: 260px;
        height: 40px;
        border:none;
        padding-left: 10%;
    }
`;
const UserlistBox=styled.div`
    width: 375px;
    display:flex;
    flex-direction : column;
    gap:5px;

    .userlistForm{
        background:#FFFFFF;
        padding:5px;
        width:290px;
        margin-left:9.6%;
        display:flex;
    }
    .userinfo{
        position:relative;
        display:flex;
        flex-direction : column;
        left:5%;
    }
    .u-Nickname{
        position:relative;
        width:80px;
        font-size: 16px;
        line-height: 23px;
    }
    .u-Id{
        position:relative;
        width:80px;
        font-size: 12px;
        color:#A6A6A6;

    }

    .userCheck>input{
        display: none; 
              
    }
    .userCheck > input+ label{
        display: inline-block;
        position:relative;
        width:10px;
        height:10px; 
        left:1100%;
        top:25%;
        border: 2px solid gainsboro;
        border-radius:50%;
    }
    .userCheck>input:checked+label{
        background-color: #FFA800;
    }
`;