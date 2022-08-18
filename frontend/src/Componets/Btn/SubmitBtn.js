import { useNavigate } from "react-router";
import axiosInstance from '../../apis/axios'
import '../../styles/SignUp.css';

const SubmitBtn = ({data}) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data) // 디버깅
        if (data.password1 !== data.password2) {
            return alert("입력된 비밀번호가 서로 다릅니다.")
        }

        axiosInstance
            .post('users/signup/', {
                nickname: data.nickname,
                username: data.username,
                password: data.password1,
                email: data.email,
                phone: data.phone1 + '-' + data.phone2 + '-' + data.phone3,
            })
            .then((res) => {
                navigate('/loginPage');
                console.log(res) // 디버깅용
                console.log(res.data)
            })
    }

    return (
        <button className="subBtn" onClick={handleSubmit}>가입하기</button>
    )
}

export default SubmitBtn;