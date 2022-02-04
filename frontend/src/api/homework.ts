import axios from 'axios';

const BASE_URL = `http://${window.location.hostname}:8000/api`;

const setToken = () => {
	const token = localStorage.getItem('access') || ``;
	const config = {
		Authorization: `JWT ${token}`,
	};
	return config;
};

export const apiGetHomeworks = (lectureId: number) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/${lectureId}/homework/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetHomeworkDetail = (lectureId: number, homeworkId: number) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/${lectureId}/homework/${homeworkId}/`,
		headers: {
			...setToken(),
		},
	});
