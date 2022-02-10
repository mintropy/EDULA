import styled from 'styled-components';
import FriendList from '../components/friend/FriendList';
import FriendGivenRequest from '../components/friend/FriendRequest';
import FriendSearch from '../components/friend/FriendSearch';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
function Friend() {
	return (
		<Container>
			<FriendList />
			<FriendSearch />
			<FriendGivenRequest />
		</Container>
	);
}

export default Friend;
