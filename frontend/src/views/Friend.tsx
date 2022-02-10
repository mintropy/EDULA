import FriendList from '../components/friend/FriendList';
import FriendGivenRequest from '../components/friend/FriendGivenRequest';
import FriendReceivedRequest from '../components/friend/FriendReceivedRequest';

function Friend() {
	return (
		<>
			<FriendList />
			<FriendGivenRequest />
			<FriendReceivedRequest />
		</>
	);
}

export default Friend;
