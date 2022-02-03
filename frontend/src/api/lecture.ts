import axios from 'axios';

const BASE_URL = `http://${window.location.hostname}:8000/api`;

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
		url: `${BASE_URL}/schools/${schoolId}/lecture/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetLectureDetail = (schoolId: number, lectureId: number) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/${schoolId}/lecture/${lectureId}/`,
		headers: {
			...setToken(),
		},
	});
