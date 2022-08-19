import plusBtn from "../../assets/PlusBtn.svg";
import styled from "styled-components";
// import { useState } from "react";

function CycleInfo(props) {
  const clickHandler = (event) => {
    // axios update 요청 보내야할 듯
    console.log(event.target);
    event.target.disabled = true;
  };

  return (
    <CycleInfoWrap>
      {/* 케어 현황 제목 및 +추가 */}
      <div className="PetlistWrapTitlelist">
        <h2 className="PetlistWrapTitle">케어현황</h2>
        <img className="PetlistWrapBtn" src={plusBtn} alt="PetlistWrapBtn" />
      </div>
      {/* 식사 */}
      <div className="PetlistMeal">
        <div className="PetlistMealTitlelist">
          <strong className="PetlistMealTitle">식사</strong>
          <p>*식사 스케줄은 매일 0시 정각에 초기화됩니다.</p>
        </div>
        <ul className="PetlistMeallist">
          <li>
            <input
              className="MealBtn morningBtn"
              value="아침"
              type="button"
              onClick={clickHandler}
              disabled={props.morning}
            />
          </li>
          <li>
            <input
              className="MealBtn LunchBtn"
              value="점심"
              type="button"
              onClick={clickHandler}
              disabled={props.lunch}
            />
          </li>
          <li>
            <input
              className="MealBtn DinnerBtn"
              value="저녁"
              type="button"
              onClick={clickHandler}
              disabled={props.dinner}
            />
          </li>
        </ul>
      </div>
      {/* 산책 */}
      <div className="PetlistWalk">
        <strong className="PetlistWalkTitle">산책</strong>
        <input
          type="button"
          className="WalkBtn"
          value="132일 전 (2022년 12월 12일 월요일)"
        />
      </div>
      {/* 목욕 */}
      <div className="PetlistBath">
        <strong className="PetlistBathTitle">목욕</strong>
        <input
          type="button"
          className="BathBtn"
          value="132일 전 (2022년 12월 12일 월요일)"
        />
      </div>
    </CycleInfoWrap>
  );
}
export default CycleInfo;

const CycleInfoWrap = styled.div`
  /* width: 295px; */
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 40px;
  background-color: #fff;
  .PetlistWrapTitlelist {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .PetlistWrapBtn {
    cursor: pointer;
  }
  .PetlistMeal {
  }
  .PetlistMealTitlelist {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p {
    font-size: 12px;
    color: #a6a6a6;
  }
  .PetlistMeallist {
    list-style: none;
    display: flex;
    width: 375px;
    gap: 8px;
    padding-left: 0;
  }
  .li {
    width: 100%;
  }
  .MealBtn {
    width: 92px;
    height: 42px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #656565;
  }
  .PetlistWalk {
  }
  .WalkBtn,
  .BathBtn {
    width: 100%;
    height: 42px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 8px;
    color: #656565;
  }
`;
