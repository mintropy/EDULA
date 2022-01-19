import _ from './_variables';

export type ThemeType = 'base' | 'dark';

const theme = {
	base: {
		fontColor: _.realBlack,
		bgColor: _.skyblue,
		subBgColor: _.white,
		warningColor: _.red,
		mainBlue: _.mainBlue,
		borderColor: _.lightGrey,
		iconColor: _.darkerWhite,
		iconColorActive: _.yellow,
		pointColor: _.pink,
	},
	dark: {
		fontColor: _.white,
		bgColor: _.realBlack,
		subBgColor: _.skyblue,
		warningColor: _.red,

		mainBlue: _.mainBlue,
		borderColor: _.lightGrey,
		iconColor: _.darkerWhite,
		iconColorActive: _.yellow,
		pointColor: _.pink,
	},
};

export default theme;
