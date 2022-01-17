import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import theme from '../styles/theme';
import { useDetectOutsideClick } from './useDetecOutsideClick';

const StyledDropdown = styled.ul`
	-webkit-appearance: button;
	-webkit-border-radius: 2px;
	-webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
	-webkit-padding-end: 20px;
	-webkit-padding-start: 2px;
	-webkit-user-select: none;
	background-image: url(https://picsum.photos/200/300.jpg),
		-webkit-linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);
	background-position: 97% center;
	background-repeat: no-repeat;
	border: 1px solid #aaa;
	border-radius: 70%;
	color: #555;
	font-size: inherit;
	margin: 20px;
	overflow: hidden;
	padding: 5px 10px;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 1.5em;
	color: transparent;
	background-color: #779126;
	padding-left: 15px;
`;

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

	span {
		font-weight: 700;
		vertical-align: middle;
		font-size: 14px;
		margin: 0 10px;
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
	top: 60px;
	right: 0;
	width: 300px;
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

	return (
		<StyledContainer>
			<StyledMenuContainer>
				<StyledMenuTrigger type='button' onClick={onClick}>
					<span>User</span>
					<img src='https://picsum.photos/50/50.jpg' alt='User avatar' />
				</StyledMenuTrigger>
				<StyledMenu ref={dropdownRef} isactive={isActive ? 'active' : 'inactive'}>
					<ul>
						<li>
							<a href='/'>My Profile</a>
						</li>
						<li>
							<a href='/'>Settings</a>
						</li>
						<li>
							<a href='/'>Log out</a>
						</li>
					</ul>
				</StyledMenu>
			</StyledMenuContainer>
		</StyledContainer>
	);
}

export default NavbarDropdown;
