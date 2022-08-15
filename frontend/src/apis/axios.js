import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api'; // entry point

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (typeof error.response === 'undefined') { // 서버가 문제인 경우
            alert('예기치 못한 에러가 발생했습니다.')
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            originalRequest.url === baseURL + 'signin/refresh/'
        ) {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) { // 새로운 액세스 토큰을 발급받는 부분
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return axiosInstance
                        .post('/signin/refresh/', { refresh: refreshToken })
                        .then((response) => {
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);

                            axiosInstance.defaults.headers['Authorization'] =
                                'JWT ' + response.data.access;
                            originalRequest.headers['Authorization'] =
                                'JWT ' + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((error) => {console.log(error)})
                } else {
                    console.log('Refresh token is expired', tokenParts.exp, now);
                    window.location.href = '/login/';
                }
            } else {
                console.log('Refresh token not available.');
                window.location.href = '/login/';
            }

            return Promise.reject(error);
        }
    }
)

export default axiosInstance;