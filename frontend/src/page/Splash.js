import React from "react"
import {Link} from 'react-router-dom';

function Splash(){
    return(
        <>
            <div className="splash">
                <div className="splashLogo"></div>
                <p className="splashTitle">
                나의 반려동물에게 딱 맞는 <br />
                관리기록 앱
                </p>
            </div>
            <Link to="/Login">
                <button>시작</button>
            </Link>
        </>
    )
}
export default Splash;