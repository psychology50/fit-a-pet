import React from "react";
import {Link} from 'react-router-dom';

function ModifyMember(){
    return(
        <>
            <div>
                멤버 관리
            </div>
            <Link to="/CreatePet">
                <button>완료</button>
            </Link>
        </>
    );
}
export default ModifyMember;