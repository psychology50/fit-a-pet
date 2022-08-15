import React,{useState} from "react";
import {Link} from 'react-router-dom';
import PetAddContainer from "../../styles/PetAddForm";
import Petinfo from "../../Componets/Petinfo";
import PetMember from "../../Componets/PetMember";
import CreatePetNav from "../../Componets/CreatePetNav";

function CreatePet(){
    const userimg={
        width: '134px',
        height: '134px',
        borderRadius:'50%',
        left:'31%',
        position: 'relative'
    }
    const sampleimg={
        width: '134px',
        height: '134px',
        borderRadius:'50%',
        background:'#A6A6A6',
        left:'31%',
        position: 'relative'
    }

    const [fileImage, setFileImage] = useState("");

    const saveFileImage = (e) => {
        // 첨부한 사진 링크 가져오기
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };
    return(
        <PetAddContainer>
            <CreatePetNav/>
            <div className="userImage" >
                {fileImage ? (
                    <img className="sampleImg" alt="sample" src={fileImage} style={userimg}/>
                  ) : (
                    <div className="NosampleImg" style={sampleimg}></div>
                  )}
                  <input
                    type="file"
                    className="imgInput"
                    id="weatherImg"
                    name="Inputfile"
                    style={{
                        marginTop:'10px',
                        left:'28%',
                        position: 'relative'
                    }}
                    onChange={saveFileImage}
                ></input>
            </div>
            <Petinfo/>
            <PetMember/>
        </PetAddContainer>
    );
}
export default CreatePet;
