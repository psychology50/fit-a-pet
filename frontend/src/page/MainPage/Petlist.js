import { Link } from "react-router-dom";
import React from "react";

const Petlist =({petlist})=>{
    return(
        <Link to={`/PetProfile/${petlist.id}`}>
            <button>{petlist.petname}</button>
        </Link>
    );
}
export default Petlist;