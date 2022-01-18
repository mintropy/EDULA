import _ from './_variables';

export type ThemeType = 'base' | 'dark';

const theme = {
	base: {
		fontColor: _.realBlack,
		bgColor: _.skyblue,
		subBgColor: _.white,
		warningColor: _.red,
	},
	dark: {
		fontColor: _.white,
		bgColor: _.realBlack,
		subBgColor: _.skyblue,
		warningColor: _.red,
	},
};

export default theme;
