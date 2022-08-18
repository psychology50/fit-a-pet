import React from "react";
import styled from 'styled-components';

function PetList(){
    return(
        <PetListBox>
            <form>
                <PetInfoBox>
                    <button style={{
                            width: '50px',
                            height: '50px',
                            border:'2px solid',
                            left:'6%',
                            top:'5%'
                            }}>
                        사진
                    </button>
                    <div className="PetListInfo">
                        <div style={{fontSize:'18px'}}>웅이(몇짤) </div>
                        <div style={{ Color:'#5A5A5A',fontSize:'14px'}} >@코드</div>
                    </div>
                </PetInfoBox>
                <PetStateBobBox>
                    <div style={{left:'13%'}}>산책</div>
                    <div className="PetBobStateBtn">
                        <button>아침</button>
                        <button>점심</button>
                        <button>저녁</button>
                    </div>
                </PetStateBobBox>
                <PetStateWalkBox>
                    <div style={{left:'13%'}}>식사</div>
                    <button>날짜ㅏㅏ</button>
                </PetStateWalkBox>

            </form>       
        </PetListBox>
        
    );
}
export default PetList;

const PetListBox= styled.div`
    position:relative;
    
    width: 325px;
    height: 300px;
    padding:15px;
    display:flex;
    form{
        left:4%;
        display:flex;
        flex-direction : column;
        position:relative;
        width:320px;
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