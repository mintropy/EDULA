import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledTitle from '../class/StyledTitle';
import { apiGetFriendRequestList } from '../../api/friend';
import StyledDiv from './StyledDiv';
import StyledContainer from './StyledContainer';

interface FriendRequestDataType {
	requsetSend: {
		id: number;
		fromUser: number;
		toUser: number;
		requestStatus: string;
	}[];
	requsetReceive: {
		id: number;
		fromUser: number;
		toUser: number;
		requestStatus: string;
	}[];
}
function FriendRequest() {
	const [friendRequestList, setFriendRequestList] = useState(
		{} as FriendRequestDataType
	);

	const getFriendRequestList = () => {
		apiGetFriendRequestList().then(res => {
			setFriendRequestList(res.data);
			console.log(res.data);
		});
	};

	useEffect(() => {
		getFriendRequestList();
	}, []);

	return (
		<div>
			<StyledContainer>
				<StyledTitle>받은 친구 신청</StyledTitle>
				{friendRequestList.requsetReceive &&
					friendRequestList.requsetReceive.map(request => (
						<StyledDiv key={request.id}>{request.fromUser}번</StyledDiv>
					))}
			</StyledContainer>
			<StyledContainer>
				<StyledTitle>보낸 친구 신청</StyledTitle>
				{friendRequestList.requsetSend &&
					friendRequestList.requsetSend.map(request => (
						<StyledDiv key={request.id}>{request.toUser}번</StyledDiv>
					))}
			</StyledContainer>
		</div>
	);
}

export default FriendRequest;
