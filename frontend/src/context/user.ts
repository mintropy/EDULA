import { createContext } from 'react';

const UserContext = createContext({
	isLoggedIn: false,
	login: (_: string, __: string) => {},
	logout: () => {},
	userId: '',
	userName: '',
	userStat: '',
	schoolId: '',
	currentLecture: '',
	profileImg: '',
});

export default UserContext;
