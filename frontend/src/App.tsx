import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Error404 from './views/Error404';
import Main from './views/Main';
import Profile from './views/Profile';
import Alarm from './views/Alarm';
import Setting from './views/Setting';
import Class from './views/Class';
import GlobalStyles from './styles/GlobalStyles';
import ContextProvider from './ContextProvider';
import routes from './routes';
import Login from './views/Login';
import CreateArticle from './views/CreateArticle';
import Findid from './views/Findid';
import Findpw from './views/Findpw';
import UpdateArticle from './views/UpdateHomework';
import ArticleDetail from './views/ArticleDetail';
import Home from './views/Home';
import Admin from './views/admin/Admin';
import StudentManager from './views/admin/Student';
import TeacherManager from './views/admin/Teacher';
import LectureManager from './views/admin/Lecture';
import ClassManager from './views/admin/Class';
import AdminIndex from './views/admin/AdminIndex';
import Schedule from './views/Schedule';

function App() {
	return (
		<ContextProvider>
			<GlobalStyles />
			<Router>
				<Routes>
					<Route path={routes.login} element={<Login />} />
					<Route path={routes.findid} element={<Findid />} />
					<Route path={routes.findpw} element={<Findpw />} />
					<Route path={routes.main} element={<Home />}>
						<Route index element={<Main />} />
						<Route path={routes.setting} element={<Setting />} />
						<Route path={`${routes.profile}/:userId`} element={<Profile />} />
						<Route path={routes.alarm} element={<Alarm />} />
						<Route path={routes.class} element={<Class />} />
						<Route path={routes.createarticle} element={<CreateArticle />} />
						<Route path={routes.updatearticle} element={<UpdateArticle />} />
						<Route path={routes.articleDetail} element={<ArticleDetail />} />
						<Route path={routes.schedule} element={<Schedule />} />
						<Route path={routes.admin} element={<Admin />}>
							<Route index element={<AdminIndex />} />
							<Route path={routes.studentManager} element={<StudentManager />} />
							<Route path={routes.teacherManager} element={<TeacherManager />} />
							<Route path={routes.lectureManager} element={<LectureManager />} />
							<Route path={routes.classManager} element={<ClassManager />} />
						</Route>
					</Route>
					<Route path='*' element={<Error404 />} />
				</Routes>
			</Router>
		</ContextProvider>
	);
}

export default App;
