import axios from 'axios';

const BASE_URL = 'http://i6d209.p.ssafy.io/api';

const setToken = () => {
	const token = localStorage.getItem('access') || ``;
	const config = {
		Authorization: `JWT ${token}`,
	};
	return config;
};

export const apiLogin = (userId: string, password: string) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/token/`,
		data: {
			username: userId,
			password,
		},
	});

export const apiCheckRefreshToken = (refresh: string) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/token/refresh/`,
		data: {
			refresh,
		},
	});

export const apiDecodeToken = () =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetUserStatus = (userId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/${userId}/`,
	});

export const apiGetAdminInfo = (adminId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/school-admin/${adminId}/`,
	});

export const apiGetStudentInfo = (studentId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/student/${studentId}/`,
	});

export const apiGetTeacherInfo = (teacherId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/teacher/${teacherId}`,
	});
