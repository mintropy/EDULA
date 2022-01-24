import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TopNavBar from '../components/navbar/TopNavBar';
import PageTitle from '../components/PageTitle';
import UserContext from '../context/user';
import routes from '../routes';

function Main() {
	const { isLoggedIn } = useContext(UserContext);
	if (!isLoggedIn) {
		return <Navigate to={routes.login} />;
	}
	return (
		<>
			<PageTitle title='main' />
			<TopNavBar />
			<Outlet />
		</>
	);
}

export default Main;
