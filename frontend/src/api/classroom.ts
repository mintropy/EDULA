import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiGetClassrooms = (schoolId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/${schoolId}/classroom/`,
		headers: {
			...setToken(),
		},
	});

export const apiPostClassroom = (schoolId: string, classroom: object) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/schools/${schoolId}/classroom/`,
		headers: {
			...setToken(),
		},
		data: {
			...classroom,
			school: parseInt(schoolId, 10),
		},
	});

export const apiGetClassroomDetail = (schoolId: string, classroomId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/${schoolId}/classroom/${classroomId}/`,
		headers: {
			...setToken(),
		},
	});
