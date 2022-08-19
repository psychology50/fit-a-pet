/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect, useState} from "react";
import styled from 'styled-components';
import searchimg from '../../image/search-line.png';
import Nav from "../Nav/Nav";
import axiosInstance from "../../apis/axios";
import BackBtn from "../Btn/BackBtn";
import MemberAddBtn from "../Btn/MemberAddBtn";

function SearchMember({user,setUser}){
    useEffect(()=>{
        axiosInstance.get("/users").then((res)=>{
            setUser(res.data);       
             //console.log(res.data);
            })  
    },[]);
    //체크 박스 구현
    const[isChecked,setIsChecked]=useState(false);//체크 여부
    const[MemberItem,setMemberItem]=useState(new Set());//체크된 요소들
    const[arr,setArr]=useState();

    const MemberHandler=({target})=>{ //체크 여부 파악
        setIsChecked(!isChecked);
        MemberItemHandler(target.parentNode,target.value,target.checked);
    }
    const MemberItemHandler=(box,id,isChecked)=>{
        if(isChecked){//체크 되었을 때
            MemberItem.add(id);//체크시 삽입
            setMemberItem(MemberItem);//스타일 변경
        }else if(!isChecked && MemberItem.has(id)){//체크 안되어있거나, 체크 두번한 경우
            MemberItem.delete(id);//체크시 삽입
            setMemberItem(MemberItem);
        }
        setArr(Array.from(MemberItem));
        return MemberItem;
    }
    useEffect(() => {
        console.log(arr);
      }, [isChecked]);
    
    //검색 구현
    const[search,setSearch]=useState("");

    const onChangeSearch=(e)=>{
        e.preventDefault();
        setSearch(e.target.value);
    };
    const onSearch=(e)=>{
        e.preventDefault();
        if(search===null||search===''){
             axiosInstance.get("/users").then((res)=>{
            setUser(res.data);
             console.log(res.data);
            })
        }
        else{
            const filterData=user.filter((resp)=>resp.nickname.includes(search))
            setUser(filterData)
        }
        setSearch('') 
    }
    
    console.log(arr)

    return(
        <MemberSearchBox>
            <BackBtn url={"/CreatePetPage"}></BackBtn>
            <MemberAddBtn data={arr}>

            </MemberAddBtn>
            {/* <Nav title={"멤버 검색"} btnName={"추가하기"} BackLink={"/CreatePetPage"} EndLink={"/CreatePetPage"} Value={arr}/> */}
            <div className="user-search">
               <img 
                    src={searchimg} 
                    style= {{
                    width: '24px',
                    height: '24px',
                    position:'absolute',
                    marginLeft:'6%',
                    marginTop:'1%'
                    }}></img>
                <form onSubmit={e=>onSearch(e)}>         
                    <input className="userid-input"type="text" value={search} placeholder="아이디를 검색하세요." onChange={onChangeSearch}></input>
                </form>
            </div>      
            <UserlistBox>
                {user.map((user)=>{
                    return( 
                        <form className="userlistForm">  
                            <div>그림</div>
                            <div className="userinfo">   
                                <div className="u-Nickname" >{user.nickname}</div>
                                <div className="u-Id">{user.username}</div>
                            </div>
                            <div className="userCheck">
                                <label key={user.id}> 
                                    <input type="checkbox" value={user.nickname} onChange={(e)=>MemberHandler(e)}></input>   
                                </label>
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

    .userid-input{
        width: 260px;
        height: 40px;
        border:none;
        padding-left: 10%;
        margin-left:10%;
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
    .userCheck{
        position:relative;
        cursor: pointer;
        white-space: pre;
        width:15px;
        height:15px;
        left:48%;
        top:25%;

    }
    // .userCheck>input{
    //     display: none;         
    // }
    // .userCheck > input+ label{
    //     display: inline-block;
    //     position:relative;
    //     width:10px;
    //     height:10px; 
    //     left:1100%;
    //     top:25%;
    //     border: 2px solid gainsboro;
    //     border-radius:50%;
    // }
    // .userCheck>input:checked+label{
    //     background-color: #FFA800;
    // }
`;