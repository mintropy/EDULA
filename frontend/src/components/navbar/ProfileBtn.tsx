import { FaSmileWink } from 'react-icons/fa';
import NavbarDropdown from './NavbarDropdown';

function Profile() {
	const profileURL = 'https://picsum.photos/50/50';

	if (profileURL) {
		return (
			<span>
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
