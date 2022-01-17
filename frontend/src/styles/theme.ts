import _ from './_variables';

export type ThemeType = 'base' | 'dark';

const theme = {
	base: {
		fontColor: _.realBlack,
		bgColor: _.white,
	},
	dark: {
		fontColor: _.white,
		bgColor: _.realBlack,
	},
};

export default theme;
