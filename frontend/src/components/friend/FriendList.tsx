import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledTitle from '../class/StyledTitle';
import { apiGetFriendList } from '../../api/friend';
import StyledDiv from './StyledDiv';
import StyledContainer from './StyledContainer';

interface FriendDataType {
	id: number;
	username: string;
	firstname: string;
	status: string;
}
const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1em;
`;

function FriendList() {
	const [friendList, setFriendList] = useState([] as FriendDataType[]);
	const getFriendList = () => {
		apiGetFriendList().then(res => {
			setFriendList(res.data);
		});
	};

	useEffect(() => {
		getFriendList();
	}, []);

	return (
		<div>
			<StyledContainer>
				<StyledTitle>친구 목록</StyledTitle>
				{friendList &&
					friendList.map(friend => (
						<StyledLink to={`/profile/${friend.id}`}>
							<StyledDiv key={friend.id}>{friend.username}</StyledDiv>
						</StyledLink>
					))}
			</StyledContainer>
		</div>
	);
}

export default FriendList;
