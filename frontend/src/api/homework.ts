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

export const apiPostHomework = (
	lectureId: number,
	title: string,
	content: string,
	deadline: string
) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/schools/${lectureId}/homework/`,
		headers: {
			...setToken(),
		},
		data: {
			title,
			content,
			deadline,
		},
	});

export const apiUpdateHomework = (
	lectureId: number,
	homeworkId: number,
	title: string,
	content: string,
	deadline: string
) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/schools/${lectureId}/homework/${homeworkId}/`,
		headers: {
			...setToken(),
		},
		data: {
			title,
			content,
			deadline,
		},
	});

export const apiDeleteHomework = (
	lectureId: number,
	homeworkId: number,
	title: string,
	content: string,
	deadline: string
) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/schools/${lectureId}/homework/${homeworkId}/`,
		headers: {
			...setToken(),
		},
		data: {
			title,
			content,
			deadline,
		},
	});
