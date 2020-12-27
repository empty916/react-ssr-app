import axios from 'axios';




const http = axios.create({
    timeout: 30000,
    baseURL: '',
});


export default http;