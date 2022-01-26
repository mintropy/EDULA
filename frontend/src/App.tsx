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
import Findid from './views/Findid';
import Findpw from './views/Findpw';
import Home from './views/Home';
import ArticleForm from './views/ArticleForm';
import Admin from './views/admin/Admin';
import StudentManager from './views/admin/Student';
import TeacherManager from './views/admin/Teacher';
import LectureManager from './views/admin/Lecture';
import ClassManager from './views/admin/Class';
import AdminIndex from './views/admin/AdminIndex';

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
						<Route path={routes.articleform} element={<ArticleForm />} />
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
