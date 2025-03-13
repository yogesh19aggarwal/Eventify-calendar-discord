import axios from 'axios';

// const myBaseurl = 'https://eventify-manager-api.onrender.com';
const myBaseurl = 'http://localhost:3000';

const AxiosInstance = axios.create({
    baseURL: myBaseurl,
    timeout: 5000,
    headers:{
        "Content-Type" : "application/json",
        accept : "application/json"
    },
    withCredentials: true,
});

export default AxiosInstance;