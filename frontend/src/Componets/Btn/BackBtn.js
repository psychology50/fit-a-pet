import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SignUp.css';

const BackBtn = (props) => {
    return <Link className="backBtn" to={props.url}/>
}

export default React.memo(BackBtn);

