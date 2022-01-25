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

const Container = styled.div`
	display: flex;
`;

function Main() {
	const { isLoggedIn } = useContext(UserContext);
	if (!isLoggedIn) {
		return <Navigate to={routes.login} />;
	}
	return (
		<>
			<TopNavBar />
			<Container>
				<SideBar />
				<OutletContainer>
					<Outlet />
				</OutletContainer>
			</Container>
		</>
	);
}

export default Main;
