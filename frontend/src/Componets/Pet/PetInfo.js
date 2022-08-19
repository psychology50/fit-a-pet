import React from "react";
import styled from "styled-components";
import profileImage from "../../assets/profileImage.png";

function PetInfo(props) {
  const now = new Date();
  const nowYear = now.getFullYear();
  const birthYear = props.birth.substr(0, 4);
  const age = birthYear - nowYear + 1;
  return (
    <MyProfile>
      <div className="profileInfo">
        <img className="profileImage" src={profileImage} alt="profileImage" />
        <div className="userId">
          <strong>{props.name}</strong>
          <p>{props.code}</p>
        </div>
      </div>
      <ul className="profileage">
        <li className="sex">
          <label>성별</label>
          <strong className="sexValue"> {props.gender} </strong>
        </li>
        <li className="age">
          <label>나이</label>
          <strong className="ageValue"> {age}살 </strong>
        </li>
        <li className="birthday">
          <label>생일</label>
          <strong className="birthdayValue"> {props.birth} </strong>
        </li>
      </ul>
    </MyProfile>
  );
}
export default PetInfo;

const MyProfile = styled.div`
  /* width: 295px; */
  margin-bottom: 16px;
  padding: 24px 0;
  height: auto;
  background-color: #ffffff;
  /* background-color : #FFA800; */

  .profileInfo {
    margin: 0 40px;
    display: flex;
    align-items: end;
    gap: 12px;
  }
  .profileImage {
    width: 110px;
    height: 110px;
    radius: 100px;
  }
  .userId {
    line-height: 20px;
  }
  strong {
    font-size: 20px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: #5a5a5a;
    font-weight: 400;
  }
  li {
    list-style: none;
  }
  label {
    font-size: 12px;
    color: #656565;
  }
  .profileage {
    /* width: 295px; */
    margin: 20px 40px;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
  }
  li {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
  }
  li > strong {
    font-size: 16px;
  }
  .sex {
    border-right: 1px solid #eaeaea;
  }
  .birthday {
    border-left: 1px solid #eaeaea;
  }
`;
