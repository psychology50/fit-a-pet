import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PetProfile =()=>{
    const{id}=useParams();
    const[pet,setPet]=useState({});

  
    useEffect(()=>{
        axios.get("/data/petlist.json").then((res)=>{
            setPet(res.data.petlist.find((petlist)=>petlist.id===parseInt(id)));
        })
    },[])
    
    console.log(pet);

    return(
        <>
            <div>
                Petlist 화면
            </div>
            <div>
                {pet.bob}
            </div>
        </>
        
    );
}
export default PetProfile;