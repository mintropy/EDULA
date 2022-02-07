import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiGetStudentLecture = (studentId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/student/${studentId}/lecture/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetTeacherLecture = (teacherId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/teacher/${teacherId}/lecture/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetLectures = () =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/`,
		headers: {
			...setToken(),
		},
	});

export const apiPostLecture = (lecture: object) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/schools/lecture/`,
		headers: {
			...setToken(),
		},
		data: {
			...lecture,
		},
	});

export const apiGetLectureDetail = (lectureId: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/schools/lecture/${lectureId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiPutLectureDetail = (lectureId: string, lecture: object) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/schools/lecture/${lectureId}/`,
		headers: {
			...setToken(),
		},
		data: {
			...lecture,
		},
	});

export const apiDeleteLectureDetail = (lectureId: string) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/schools/lecture/${lectureId}/`,
		headers: {
			...setToken(),
		},
	});
