import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiGetLectures = (schoolId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetLectureDetail = (schoolId: string, lectureId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/`,
		headers: {
			...setToken(),
		},
	});
