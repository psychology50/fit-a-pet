import React from "react";
import styled from 'styled-components';
import RandomPic from '../../assets/RandomPic.png';

function PetProfileTap(){
    return(
        <PetTapContainer>
            {/* this is Tap  */}
            <PetTapList>
                 <ul>
                    <li className='scheduleClicked'>스케줄</li>
                    <li>사진</li>
                    <li>병원 기록</li>
                 </ul>
            </PetTapList>
            {/* This is Contents   */}
            {/* when u taped PetSchedule */}
            <PetTapSchedule>
                <PetTapAddBtn>
                    <input type="button" className="PetTapAddBtn" value="새로운 스케줄 추가하기 +" />
                </PetTapAddBtn>
                <ul className="PetTapScheduleContents">
                    <li className="PetTapScheduleList PetTapScheduleListclicked">
                        <div className="PetTapScheduleInfo">
                            <h3>웅이 병원 진찰 예약</h3>
                            <p>2022.8.8(월) 오전 11:00</p>
                        </div>
                        <strong>D-Day</strong>
                    </li>
                    <li className="PetTapScheduleList">
                        <div className="PetTapScheduleInfo">
                            <h3>웅이 병원 진찰 예약</h3>
                            <p>2022.8.8(월) 오전 11:00</p>
                        </div>
                        <strong>D-Day</strong>
                    </li>
                </ul>

            </PetTapSchedule>
            {/* when u taped PetPictures  */}
            <PetTapPicture>
                <PetTapAddBtn>
                    <input type="button" className="PetTapAddBtn" value="새로운 사진 추가하기 +" />
                </PetTapAddBtn>
                <div className="PetTapPuctureGrid">
                    {/* here coming ur pet random pictures */}
                    <img className="GridPicture" src={RandomPic} alt="GridPicture" />
                    <img className="GridPicture" src={RandomPic} alt="GridPicture" />
                    <img className="GridPicture" src={RandomPic} alt="GridPicture" />
                    <img className="GridPicture" src={RandomPic} alt="GridPicture" />
                </div>
            </PetTapPicture>
            {/* when u taped PetPrescription */}
            <PetTapPrescription>
                <PetTapAddBtn>
                    <input type="button" className="PetTapAddBtn" value="새로운 병원 기록 추가하기 +" />
                </PetTapAddBtn>
                {/* coming Pet Prescription info here  */}
                <div className="PetPrescriptionContents">
                    <h3>웅이 병원 진찰 결과</h3>
                    <p className="PetPrescriptionDate">
                        2021.12.12
                        </p>
                    <p className="PetPrescriptionLocation">
                        다람병원
                    </p>
                    <p className="PetPrescriptionComm">
                        웅이가 진짜 귀엽다는 진단이 나왔다... 설마해서 병원갔는데 의사소견으로 직접 들으니까 너무 충격적이다. 의사쌤이 앞으로 웅이가 귀찮아할지도 모른다는데, 내가 어떻게 해줘야할지 막막하진 않고 웅이 귀여워  
                    </p>
                </div>
                <div className="PetPrescriptionContents">
                    <h3>웅이 병원 진찰 결과</h3>
                    <p className="PetPrescriptionDate">
                        2021.12.12
                        </p>
                    <p className="PetPrescriptionLocation">
                        다람병원
                    </p>
                    <p className="PetPrescriptionComm">
                        웅이가 진짜 귀엽다는 진단이 나왔다... 설마해서 병원갔는데 의사소견으로 직접 들으니까 너무 충격적이다. 의사쌤이 앞으로 웅이가 귀찮아할지도 모른다는데, 내가 어떻게 해줘야할지 막막하진 않고 웅이 귀여워  
                    </p>
                </div>
            </PetTapPrescription>
        </PetTapContainer>
    );
}
export default PetProfileTap;

const PetTapContainer=styled.div`
    padding: 2px 40px;
    margin: 16px 0;
    background-color: #fff;

`;
const PetTapList=styled.div`
    ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        padding-left: 0;
        font-size: 18px;
        font-weight: 700;
    }
    li{
        color : #A6A6A6;
        height: 40px;
        width: 100%;
        text-align:center;
        border-bottom: 2px solid #A6A6A6;
        cursor: pointer;
    }
    /* this is when schedule is clicked */
    .scheduleClicked{
        color : #FFA800;
        border-bottom: 2px solid #FFA800;

    }
`;
// this is integrated AddBtn+ 
const PetTapAddBtn=styled.div`
    .PetTapAddBtn{
        width: 100%;
        border: none;
        background-color: transparent;
        color: #A6A6A6;
        font-weight: 700;
        cursor: pointer;
        text-align: right;
    }
`;

// Tap clicked Schedule
const PetTapSchedule=styled.div`
    .PetTapScheduleContents{
        list-style: none;
        padding-left: 0;
    }
    .PetTapScheduleList{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        line-height: 0.5;
        border-bottom: 1px solid #EAEAEA;
    }
    .PetTapScheduleInfo p{
        font-size: 12px;
        line-height: 0.3;
    }
    /* this is when PetTapScheduleList is clicked */
    .PetTapScheduleListclicked{
        color: #FFA800;
    }
`;
// Tap clicked Picture 
const PetTapPicture=styled.div`
    .PetTapPuctureGrid{
    display: grid;
    width: 100%;
    grid-template: 100px / auto auto auto;
    grid-gap: 8px;
    padding-top: 16px;
    }
    .GridPicture{
        height: 100px;
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`;
// Tap clicked Prescription  
const PetTapPrescription=styled.div`
    p{
        font-size: 14px;
    }
    .PetPrescriptionContents{
        border-bottom: 1px solid #EAEAEA;
    }
`;
