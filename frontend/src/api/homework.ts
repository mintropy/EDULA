import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}/api`;

const setToken = () => {
	const token = localStorage.getItem('access') || ``;
	const config = {
		Authorization: `JWT ${token}`,
	};
	return config;
};

export const apiGetHomeworks = (lectureId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetHomeworkDetail = (lectureId: string, homeworkId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/${homeworkId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiPostHomework = (
	lectureId: string,
	title: string,
	content: string,
	deadline: string
) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/`,
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
	lectureId: string,
	homeworkId: string,
	title: string,
	content: string,
	deadline: string
) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/${homeworkId}/`,
		headers: {
			...setToken(),
		},
		data: {
			title,
			content,
			deadline,
		},
	});

export const apiDeleteHomework = (lectureId: string, homeworkId: string) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/${homeworkId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetHomeworkSubmission = (
	lectureId: string,
	homeworkId: string
) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/${homeworkId}/submission/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetHomeworkSubmissionDetail = (
	lectureId: string,
	homeworkId: string,
	userId: string
) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/${homeworkId}/submission/${userId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiDeleteHomeworkSubmission = (
	lectureId: string,
	homeworkId: string,
	userId: string
) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/${homeworkId}/submission/${userId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiPostHomeworkSubmission = (
	lectureId: string,
	homeworkId: string,
	title: string,
	content: string,
	file: string,
	homework: string,
	writer: string
) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/schools/lecture/${lectureId}/homework/${homeworkId}/submission/`,
		headers: {
			...setToken(),
		},
		data: {
			title,
			content,
			file,
			homework,
			writer,
		},
	});
