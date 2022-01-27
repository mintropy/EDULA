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
	admin: '/administrator',
	studentManager: '/administrator/student',
	teacherManager: '/administrator/teacher',
	classManager: '/administrator/class',
	lectureManager: '/administrator/lecture',
};

export default routes;
