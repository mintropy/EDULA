import { ReactNode, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ThemeContext from './context/theme';
import theme, { ThemeType } from './styles/theme';

type PropType = {
	children: ReactNode;
};

function ContextProvider({ children }: PropType) {
	const storedTheme: ThemeType =
		(localStorage.getItem('theme') as ThemeType) || 'base';
	const [mainTheme, setMainTheme] = useState(theme[storedTheme] || theme.base);

	const changeTheme = (themename: string): void => {
		if (themename === 'dark') {
			setMainTheme(theme.dark);
			localStorage.setItem('theme', 'dark');
		} else if (themename === 'nature') {
			setMainTheme(theme.nature);
			localStorage.setItem('theme', 'nature');
		} else if (themename === 'twilight') {
			setMainTheme(theme.twilight);
			localStorage.setItem('theme', 'twilight');
		} else {
			setMainTheme(theme.base);
			localStorage.setItem('theme', 'base');
		}
	};

	const themeValues = useMemo(
		() => ({ theme: mainTheme, changeTheme }),
		[mainTheme, changeTheme]
	);

	return (
		<ThemeContext.Provider value={themeValues}>
			<ThemeProvider theme={mainTheme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default ContextProvider;
