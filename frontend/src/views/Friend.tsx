import FriendList from '../components/friend/FriendList';
import FriendGivenRequest from '../components/friend/FriendRequest';
import FriendSearch from '../components/friend/FriendSearch';

function Friend() {
	return (
		<>
			<FriendList />
			<FriendSearch />
			<FriendGivenRequest />
		</>
	);
}

export default Friend;
