import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const apiLogin = (userId: string, password: string) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/token/`,
		data: { username: userId, password },
	});

export const apiCheckRefreshToken = (refresh: string) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/token/refresh/`,
		data: { refresh },
	});
