import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledTitle from '../class/StyledTitle';
import { apiGetFriendRequestList } from '../../api/friend';
import StyledDiv from './StyledDiv';
import StyledContainer from './StyledContainer';

interface FriendRequestDataType {
	requestSend: {
		id: number;
		fromUser: {
			id: number;
			username: string;
			firstName: string;
			status: string;
		};
		toUser: {
			id: number;
			username: string;
			firstName: string;
			status: string;
		};
		requestStatus: string;
	}[];
	requestReveive: {
		id: number;
		fromUser: {
			id: number;
			username: string;
			firstName: string;
			status: string;
		};
		toUser: {
			id: number;
			username: string;
			firstName: string;
			status: string;
		};
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
		});
	};

	useEffect(() => {
		getFriendRequestList();
	}, []);

	return (
		<div>
			<StyledContainer>
				<StyledTitle>받은 친구 신청</StyledTitle>
				{friendRequestList.requestReveive &&
					friendRequestList.requestReveive.map(request => (
						<StyledDiv key={request.id}>
							{request.fromUser.username} : {request.fromUser.firstName}
						</StyledDiv>
					))}
			</StyledContainer>
			<StyledContainer>
				<StyledTitle>보낸 친구 신청</StyledTitle>
				{friendRequestList.requestSend &&
					friendRequestList.requestSend.map(request => (
						<StyledDiv key={request.id}>
							{request.toUser.username} : {request.toUser.firstName}
						</StyledDiv>
					))}
			</StyledContainer>
		</div>
	);
}

export default FriendRequest;
