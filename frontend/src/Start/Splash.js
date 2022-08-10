import React from "react"
import {Link} from 'react-router-dom';

function Splash(){
    return(
        <>
            <div>
                개동단결
            </div>
            <Link to="/Login">
                <button>시작</button>
            </Link>
        </>
    );
}
export default Splash;