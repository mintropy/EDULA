const routes = {
	main: '/',
	login: '/login',
	setting: '/setting',
	profile: '/profile',
	alarm: '/alarm',
	class: '/lecture/:lectureId',
	findid: '/findid',
	findpw: '/findpw',
	createarticle: '/:lectureId/articleCreate',
	updatearticle: '/:lectureId/articleUpdate/:articleId',
	articleDetail: '/:lectureId/article/:articleId',
	articleform: '/articleform',
	// Admin Page
	admin: '/manage',
	studentManager: '/manage/student',
	teacherManager: '/manage/teacher',
	classManager: '/manage/class',
	lectureManager: '/manage/lecture',
};

export default routes;
