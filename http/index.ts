import axios from 'axios';




export const createHttp = () => axios.create({
	timeout: 30000,
	baseURL: '',
});


export default createHttp();
