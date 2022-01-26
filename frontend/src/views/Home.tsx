import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopNavBar from '../components/navbar/TopNavBar';
import UserContext from '../context/user';
import routes from '../routes';

const OutletContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Main() {
	const { isLoggedIn } = useContext(UserContext);
	if (!isLoggedIn) {
		return <Navigate to={routes.login} />;
	}
	return (
		<>
			<TopNavBar />
			<OutletContainer>
				<Outlet />
			</OutletContainer>
		</>
	);
}

export default Main;
