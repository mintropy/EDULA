import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopNavBar from '../components/navbar/TopNavBar';
import UserContext from '../context/user';
import routes from '../routes';
import SideBar from '../components/sidebar/SideBar';

const OutletContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

function Main() {
	const { isLoggedIn } = useContext(UserContext);
	if (!isLoggedIn) {
		return <Navigate to={routes.login} />;
	}
	return (
		<>
			<TopNavBar />
			<SideBar />
			<OutletContainer>
				<Outlet />
			</OutletContainer>
		</>
	);
}

export default Main;
