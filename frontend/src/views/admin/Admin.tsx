import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const OutletContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Admin() {
	return (
		<OutletContainer>
			<Outlet />
		</OutletContainer>
	);
}

export default Admin;
