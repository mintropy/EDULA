const routes = {
	main: '/',
	login: '/login',
	setting: '/setting',
	profile: '/profile',
	alarm: '/alarm',
	class: '/class',
	findid: '/findid',
	findpw: '/findpw',
	createarticle: '/articleCreate',
	updatearticle: '/articleUpdate/:articleId',
	articleDetail: '/article/:articleId',
	articleform: '/articleform',
	// Admin Page
	admin: '/manage',
	studentManager: '/manage/student',
	teacherManager: '/manage/teacher',
	classManager: '/manage/class',
	lectureManager: '/manage/lecture',
};

export default routes;
