import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { apiCheckRefreshToken, apiDecodeToken } from './api/user';
import ThemeContext from './context/theme';
import UserContext from './context/user';
import theme, { ThemeType } from './styles/theme';

type PropType = {
	children: ReactNode;
};

function ContextProvider({ children }: PropType) {
	const storedTheme: ThemeType =
		(localStorage.getItem('theme') as ThemeType) || 'base';
	const storedIsLoggedIn: boolean = Boolean(localStorage.getItem('refresh'));
	const [mainTheme, setMainTheme] = useState(theme[storedTheme] || theme.base);
	const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn);
	const [userId, setUserId] = useState('');
	const [userStat, setUserStat] = useState('');

	const changeTheme = (themename: string): void => {
		setMainTheme((theme as any)[themename] || theme.base);
		localStorage.setItem('theme', themename);
	};

	const login = (access: string, refresh: string): void => {
		localStorage.setItem('access', access);
		localStorage.setItem('refresh', refresh);
		setIsLoggedIn(true);
	};

	const logout = (): void => {
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		setIsLoggedIn(false);
	};

	useEffect(() => {
		if (isLoggedIn) {
			apiDecodeToken().then(res => {
				setUserId(res.data.id);
				setUserStat(res.data.status);
			});
		} else {
			setUserId('');
			setUserStat('');
		}
	}, [isLoggedIn]);

	useEffect(() => {
		const storedRefreshToken: string | null = localStorage.getItem('refresh');
		if (typeof storedRefreshToken === 'string') {
			try {
				apiCheckRefreshToken(storedRefreshToken).then(res => {
					if (res.data?.access && res.data?.refresh) {
						login(res.data.access, res.data.refresh);
					} else {
						logout();
					}
				});
			} catch (error) {
				logout();
			}
		}
	}, []);

	const themeValues = useMemo(
		() => ({ theme: mainTheme, changeTheme }),
		[mainTheme, changeTheme]
	);

	const userValues = useMemo(
		() => ({
			isLoggedIn,
			login,
			logout,
			userId,
			userStat,
		}),
		[isLoggedIn, login, logout, userId, userStat]
	);

	return (
		<ThemeContext.Provider value={themeValues}>
			<ThemeProvider theme={mainTheme}>
				<UserContext.Provider value={userValues}>{children}</UserContext.Provider>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default ContextProvider;
