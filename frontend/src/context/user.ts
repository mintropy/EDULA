import { createContext } from 'react';

export interface User {
	username?: string;
	userId: string;
	userType: string;
	profilePath?: string;
	email?: string;
	phoneNumber?: string;
	guardianNumber?: string;
}

const defaultUser: User = {
	userId: '',
	userType: '',
};

const UserContext = createContext({ user: defaultUser, changeUser: () => {} });

export default UserContext;
