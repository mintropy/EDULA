import _ from './_variables';

export type ThemeType = 'base' | 'dark' | 'nature' | 'twilight';

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
	nature: {
		fontColor: _.realBlack,
		bgColor: _.natureGreen,
		subBgColor: _.natureGreyBlue,
		warningColor: _.red,
		mainBlue: _.natureBrownGreen,
		borderColor: _.lightGrey,
		iconColor: _.darkerWhite,
		iconColorActive: _.natureGreen,
		pointColor: _.naturePink,
	},
	twilight: {
		fontColor: _.twilightBrown,
		bgColor: _.twilightPurple,
		subBgColor: _.twilightBlue,
		warningColor: _.red,
		mainBlue: _.twilightBlue,
		borderColor: _.lightGrey,
		iconColor: _.darkerWhite,
		iconColorActive: _.natureGreen,
		pointColor: _.twilightPink,
	},
};

export default theme;
