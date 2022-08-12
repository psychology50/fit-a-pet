import React from "react";
import {Link} from 'react-router-dom';

function CreatePet(){
    return(
        <>
            <div>
                pet 등록
            </div>
            <Link to="/ModifyMember">
                <button>편집</button>
            </Link>
            <Link to="/Main">
                <button>확인</button>
            </Link>
        </>
    );
}
export default CreatePet;