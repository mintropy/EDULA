import { useContext } from 'react';
import { FaSmileWink } from 'react-icons/fa';
import NavbarDropdown from './NavbarDropdown';
import UserContext from '../../context/user';

function Profile() {
	const { profileImg } = useContext(UserContext);

	if (profileImg) {
		return (
			<span>
				<NavbarDropdown />
			</span>
		);
	}

	return (
		<span>
			<FaSmileWink />
			<NavbarDropdown />
		</span>
	);
}

export default Profile;
