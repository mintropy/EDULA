import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}/api`;


const setToken = () => {
	const token = localStorage.getItem('access') || ``;
	const config = {
		Authorization: `JWT ${token}`,
	};
	return config;
};

export const apiGetLectures = (schoolId: number) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetLectureDetail = (schoolId: number, lectureId: number) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/`,
		headers: {
			...setToken(),
		},
	});
