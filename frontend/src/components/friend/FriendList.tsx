import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledTitle from '../class/StyledTitle';
import { apiGetFriendList, apiDeleteFriend } from '../../api/friend';
import StyledDiv from './StyledDiv';
import StyledContainer from './StyledContainer';
import StyledDeleteBtn from './StyledDeleteBtn';

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
const StyledSpan = styled.span`
	color: ${props => props.theme.fontColor};
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
							<StyledDiv key={friend.id}>
								<StyledSpan>{friend.username}</StyledSpan>
								<StyledDeleteBtn
									type='button'
									value='삭제'
									onClick={e => {
										e.preventDefault();
										if (friend.id) {
											try {
												apiDeleteFriend(friend.id.toString());
											} catch (error) {
												// console.log(error);
											}
										}
									}}
								>
									삭제
								</StyledDeleteBtn>
							</StyledDiv>
						</StyledLink>
					))}
				{friendList.length === 0 && <StyledDiv> 없어요</StyledDiv>}
			</StyledContainer>
		</div>
	);
}

export default FriendList;
