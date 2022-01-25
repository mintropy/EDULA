import { useParams } from 'react-router-dom';

function Profile() {
	const { userId } = useParams();

	return (
		<div>
			<h1>{userId}&apos;s Profile✨🐸🐔🐲🦄</h1>
		</div>
	);
}

export default Profile;
