import axios from "axios";
import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import Petlist from './Petlist';

function Main({petlist,setPetlist}){

    useEffect(()=>{
        axios.get("/data/petlist.json").then((res)=>{
            setPetlist(res.data.petlist);
        })
    },[setPetlist]);


    return(
        <>
            <div>
                메인화면
            </div>
            <div>
                {petlist.map((petlist)=>{
                    return <Petlist key={`key-${petlist.id}`} petlist={petlist}/>
                })}
            </div>
        </>
    );
}
export default Main;