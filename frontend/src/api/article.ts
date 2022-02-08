import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}/api`;

const setToken = () => {
	const token = localStorage.getItem('access') || ``;
	const config = {
		Authorization: `JWT ${token}`,
	};
	return config;
};

export const apiGetArticles = (lectureId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/article/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetArticleDetail = (lectureId: string, articleId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/article/${articleId}`,
		headers: {
			...setToken(),
		},
	});

export const apiPostArticle = (
	lectureId: string,
	title: string,
	content: string,
	notice: boolean,
	writer: string,
	lecture: string
) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/schools/lecture/${lectureId}/article/`,
		headers: {
			...setToken(),
		},
		data: {
			title,
			content,
			notice,
			writer,
			lecture,
		},
	});

export const apiUpdateArticle = (
	lectureId: string,
	articleId: string,
	title: string,
	content: string,
	notice: boolean,
	writer: string,
	lecture: string
) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/schools/lecture/${lectureId}/article/${articleId}/`,
		headers: {
			...setToken(),
		},
		data: {
			title,
			content,
			notice,
			writer,
			lecture,
		},
	});

export const apiDeleteArticle = (lectureId: string, articleId: string) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/schools/lecture/${lectureId}/article/${articleId}`,
		headers: {
			...setToken(),
		},
	});
