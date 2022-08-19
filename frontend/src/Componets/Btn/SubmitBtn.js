import { useNavigate } from "react-router";
import axiosInstance from '../../apis/axios'
import '../../styles/SignUp.css';

const SubmitBtn = ({current}) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const [k, v] of Object.entries(current)) {
            if (!v.value) {
                alert(`${k}를 입력해주세요`)
                return v.focus()
            }
        }
        if (current['password1'].value !== current['password2'].value) {
            alert("입력된 비밀번호가 서로 다릅니다.")
            return current['password2'].focus()
        }
        
        axiosInstance
            .post('users/signup/', {
                nickname: current['nickname'].value,
                username: current['username'].value,
                password: current['password1'].value,
                email: current['email'].value,
                phone: current['phone1'].value + '-' + current['phone2'].value + '-' + current['phone3'].value,
            })
            .then((res) => {
                navigate('/loginPage');
                console.log(res)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.response.data.nickname[0])
                return current['nickname'].focus()
            })
    }

    return (
        <button className="subBtn" onClick={handleSubmit}>가입하기</button>
    )
}

export default SubmitBtn;