import {Link} from 'react-router-dom';

const PetAddBtn = ({data}) => {
    console.log(data);
    return (
        // <Link to="/CreatePetPage">
            <button className="AddBtn"  >등록하기</button>
        // </Link>        
    )
}

export default PetAddBtn;