import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
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

function FriendList() {
	const [friendList, setFriendList] = useState([] as FriendDataType[]);
	const getFriendList = () => {
		apiGetFriendList().then(res => {
			setFriendList(res.data);
			console.log(res.data);
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
						<StyledDiv key={friend.id}>{friend.username}</StyledDiv>
					))}
			</StyledContainer>
		</div>
	);
}

export default FriendList;
