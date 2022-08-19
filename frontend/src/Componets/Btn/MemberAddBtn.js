import {Link} from 'react-router-dom';

const MemberAddBtn = ({data}) => {
    console.log(data);
    return (
        <Link to="/CreatePetPage">
            <button className="AddBtn" onClick={data}>추가하기</button>
        </Link>        
    )
}

export default MemberAddBtn;