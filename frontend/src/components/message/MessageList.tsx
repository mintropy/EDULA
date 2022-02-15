import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledTitle from '../class/StyledTitle';
import StyledContainer from '../friend/StyledContainer';
import {
	apiDeleteMessage,
	apiPatchMessage,
	apiGetMessageCnt,
} from '../../api/directMessage';
import StyledDeleteBtn from '../friend/StyledDeleteBtn';

const StyledReadBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.bgColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;

const StyledMessageDeleteBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.borderColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;

function MessageList() {
	const [totalMessageCnt, setTotalMessageCnt] = useState(0);
	const [messageCnt, setMessageCnt] = useState(0);

	const getTotalMessageCnt = () => {
		apiGetMessageCnt()
			.then(res => {
				setTotalMessageCnt(res.data.countAll);
				setMessageCnt(res.data.count);
			})
			.catch();
	};

	useEffect(() => {
		getTotalMessageCnt();
	}, []);
	return (
		<StyledContainer>
			<StyledTitle>주고 받은 쪽지</StyledTitle>
			<p>
				안 읽은 쪽지: {messageCnt} / 전체 쪽지: {totalMessageCnt}
			</p>
		</StyledContainer>
	);
}

export default MessageList;
