import React from "react";
import {Link} from 'react-router-dom';

function InitialMain(){
    return(
        <>
            <div>
                초기 메인화면
            </div>
            <Link to="/CreatePet">
                <button>반려동물 찾기</button>
            </Link>
            <Link to="/Login">
                <button>새로 등록하기</button>
            </Link>
        </>
    );
}
export default InitialMain;