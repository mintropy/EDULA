import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiSignup = (
	firstName: string,
	password: string,
	schoolName: string,
	schoolAbb: string
) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/resister/`,
		data: {
			firstName,
			password,
			school: {
				name: schoolName,
				abbreviation: schoolAbb,
			},
		},
	});

export const apiGetAdmin = (schoolAdminPk: string) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/school-admin/${schoolAdminPk}/`,
		headers: {
			...setToken(),
		},
	});
