import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import theme from '../styles/theme';
import { useDetectOutsideClick } from './useDetecOutsideClick';

const StyledContainer = styled.div`
	box-sizing: border-box;
`;
const StyledMenuContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledMenuTrigger = styled.button`
	background: #ffffff;
	border-radius: 90px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 6px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	border: none;
	vertical-align: middle;
	transition: box-shadow 0.4s ease;
	margin-left: auto; /* Strictly for positioning */

	:hover {
		box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	}

	img {
		border-radius: 90px;
	}
`;

interface MenuProp {
	isactive: string;
}

const StyledMenu = styled.nav<MenuProp>`
	background: #ffffff;
	border-radius: 8px;
	position: absolute;
	top: 3.5rem;
	right: 0;
	width: 18rem;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transform: translateY(-20px);
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
	${props =>
		props.isactive === 'active' &&
		css`
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		`}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		border-bottom: 1px solid #dddddd;
	}

	li a {
		font-size: 1rem;
		text-decoration: none;
		color: #333333;
		padding: 0.4rem 1rem;
		display: block;
	}
`;

function NavbarDropdown() {
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
	const onClick = () => setIsActive(!isActive);

	function logout() {
		console.log('logout');
	}

	return (
		<StyledContainer>
			<StyledMenuContainer>
				<StyledMenuTrigger type='button' onClick={onClick}>
					<img src='https://picsum.photos/50/50.jpg' alt='User avatar' />
				</StyledMenuTrigger>
				<StyledMenu ref={dropdownRef} isactive={isActive ? 'active' : 'inactive'}>
					<ul>
						<li>
							<Link to='/profile'>My Profile</Link>
						</li>
						<li>
							<Link to='/setting'>Settings</Link>
						</li>
						<li>
							<button type='button' onClick={logout}>
								Log out
							</button>
						</li>
					</ul>
				</StyledMenu>
			</StyledMenuContainer>
		</StyledContainer>
	);
}

export default NavbarDropdown;
