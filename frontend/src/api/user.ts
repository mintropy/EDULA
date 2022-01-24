import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const apiLogin = (userId: string, password: string) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/api/token/`,
		data: { username: userId, password },
	}).catch(e => {
		throw e;
	});

export const apiGetProfile = () => {};
