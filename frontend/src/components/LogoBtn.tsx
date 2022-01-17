import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';

const StyledTitle = styled.p`
	color: white;
	margin: 0.1rem;
`;

const StyledLogoImg = styled.img`
	width: 1em;
	height: 1em;
	margin: 0 0.3rem 0 0;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const StyledLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	padding: 0.375rem 0.75rem;
	line-height: 1.5;
	border: 1px solid lightgray;
	font-size: 3rem;
	text-decoration: none;
`;

function Logo() {
	return (
		<StyledLink to='/'>
			<Container>
				<StyledLogoImg src='/images/logo.png' alt='logo' />
				<StyledTitle>Edula</StyledTitle>
			</Container>
		</StyledLink>
	);
}

export default Logo;
