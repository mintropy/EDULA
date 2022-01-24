import { useContext } from 'react';
import styled from 'styled-components';
import Logo from './LogoBtn';
import Alert from './AlarmBtn';
import Profile from './ProfileBtn';
import UserContext from '../../context/user';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.375rem 0.75rem;
	line-height: 1.5;
	border: 1px solid ${props => props.theme.borderColor};
	color: ${props => props.theme.subBgColor};
	font-size: 3rem;
	background-color: ${props => props.theme.mainBlue};
`;

const StyledSpan = styled.span`
	display: flex;
	align-items: center;
`;

function TopNavBar() {
	const { logout } = useContext(UserContext);
	return (
		<StyledNav>
			<Logo />
			<StyledSpan>
				<button onClick={() => logout()} type='button'>
					로그아웃
				</button>
				<Alert />
				<Profile />
			</StyledSpan>
		</StyledNav>
	);
}

export default TopNavBar;
