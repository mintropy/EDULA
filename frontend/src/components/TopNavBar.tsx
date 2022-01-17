import React from 'react';
import styled from 'styled-components';
import Logo from './LogoBtn';
import Alert from './AlarmBtn';
import Profile from './ProfileBtn';
import theme from '../styles/theme';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.375rem 0.75rem;
	line-height: 1.5;
	border: 1px solid lightgray;
	color: white;
	font-size: 3rem;
	background-color: ${theme.base.mainBlue};
`;

const StyledSpan = styled.span`
	display: flex;
	align-items: center;
`;

function TopNavBar() {
	return (
		<StyledNav>
			<Logo />
			<StyledSpan>
				<Alert />
				<Profile />
			</StyledSpan>
		</StyledNav>
	);
}

export default TopNavBar;
