import { ReactNode, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { apiCheckRefreshToken } from './api/user';
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

	const changeTheme = (themename: string): void => {
		if (themename === 'dark') {
			setMainTheme(theme.dark);
			localStorage.setItem('theme', 'dark');
		} else {
			setMainTheme(theme.base);
			localStorage.setItem('theme', 'base');
		}
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

	const themeValues = useMemo(
		() => ({ theme: mainTheme, changeTheme }),
		[mainTheme, changeTheme]
	);

	const userValues = useMemo(
		() => ({ isLoggedIn, login, logout }),
		[isLoggedIn, login, logout]
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
