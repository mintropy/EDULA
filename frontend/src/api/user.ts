import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}/api`;

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
		headers: {
			...setToken(),
		},
	});

export const apiGetAdminInfo = (adminId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/school-admin/${adminId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetStudentInfo = (studentId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/student/${studentId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetTeacherInfo = (teacherId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/teacher/${teacherId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiPutAdminInfo = (adminId: string, user: object) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/accounts/school-admin/${adminId}/`,
		headers: {
			...setToken(),
		},
		data: {
			user,
		},
	});

export const apiPutStudentInfo = (
	studentId: string,
	user: object,
	guardianPhone: string
) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/accounts/student/${studentId}/`,
		headers: {
			...setToken(),
		},
		data: {
			user,
			guardianPhone,
		},
	});

export const apiPutTeacherInfo = (teacherId: string, user: object) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/accounts/teacher/${teacherId}/`,
		headers: {
			...setToken(),
		},
		data: {
			user,
		},
	});
