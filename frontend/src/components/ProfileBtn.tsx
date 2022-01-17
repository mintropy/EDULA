import React from 'react';
import styled from 'styled-components';
import { FaSmileWink } from 'react-icons/fa';
import { _ } from '../styles/_variables';
import NavbarDropdown from './NavbarDropdown';

const ProfileImg = styled.img`
	border-radius: 70%;
	margin-left: 0.5rem;
	box-shadow: 0 10px 50px gray;
`;

interface Iprops {
	profileURL: string;
}

function Profile() {
	const profileURL = 'https://picsum.photos/50/50';

	if (profileURL) {
		return (
			<span>
				{/* <ProfileImg src={profileURL} alt='logo' /> */}
				<NavbarDropdown />
			</span>
		);
	}

	return (
		<span>
			<FaSmileWink />
		</span>
	);
}

export default Profile;
