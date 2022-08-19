import React,{useState,useEffect} from "react";
import styled from 'styled-components';
import axiosInstance from "../../apis/axios";
import {Link} from 'react-router-dom';

function PetList(){
    const[pet,setPets]=useState([]);

    useEffect(()=>{
        axiosInstance.get('/pets')
            .then((res) => {
                //console.log(res.data[0]);
                setPets(res.data);  
                            
            })
    },[]);
console.log(pet);  
    return(
        <PetListBox>
            {pet.map((pet)=>{
                return(
                    <form>
                        <PetInfoBox>
                            <Link to="/PetProfile">
                                <button style={{
                                        width: '50px',
                                        height: '50px',
                                        border:'2px solid',
                                        left:'6%',
                                        top:'5%'
                                        }}>
                                    사진
                                </button>
                            </Link>
                            
                            <div className="PetListInfo">
                                <div style={{fontSize:'18px'}}>{pet.pet_name}</div>
                                <div style={{ Color:'#5A5A5A',fontSize:'14px'}} >@{pet.code}</div>
                            </div>
                        </PetInfoBox>
                        <PetStateBobBox>
                            <div style={{left:'11%'}}>식사</div>
                            <div className="PetBobStateBtn">
                                <button>아침</button>
                                <button>점심</button>
                                <button>저녁</button>
                            </div>
                        </PetStateBobBox>
                        <PetStateWalkBox>
                            <div style={{left:'11%'}}>산책</div>
                            <button>날짜ㅏㅏ</button>
                        </PetStateWalkBox>

                    </form>       
                )
            })}
            <Link to="/CreatePetPage">
                <button className="Petaddbtn">+</button>
            </Link>
            
            
        </PetListBox>
        
    );
}
export default PetList;

const PetListBox= styled.div`
    position:relative;
    height: 300px; 
    padding:15px;
    display:flex;  
    flex-direction : column;
    left:7%;
    width: 290px; 
    .Petaddbtn{
        position:relative;
        font-size:20px;
        top:51%;
        left:46%;
        width:30px;
        height:30px;
        border:none;
        border-radius:50px;
    }
    form{
        right:6%;
        width:287px;
        display:flex;
        flex-direction : column;
        position:relative;
        height:200px;
        background:#FFFFFF;
        display:flex;
        padding:20px;
    }

`;
const PetInfoBox=styled.div`
    width:320px;
    height:90px;
    display:flex;
    *{
        position:relative;
    }
    .PetListInfo{
        display:flex;
        flex-direction : column;
        width:320px;
        height:90px;
        left:10%;
        top:5%;
}
`;
const PetStateBobBox=styled.div`
    width:280px;
    height:65px;
    display:flex;
    *{
        position:relative;
    }
    .PetBobStateBtn{
        width:200px;
        left:20%;
        display:flex;
        height:30px;
        gap:10px;
    }
    .PetBobStateBtn>Button{
        width:59px;
    }
`;
const PetStateWalkBox=styled.div`
    width:280px;
    height:65px;
    display:flex;
    *{
        position:relative;
    }
    button{
        width:200px;
        height:30px;
        left:19%;
    }
`;