import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledTitle from '../class/StyledTitle';
import StyledContainer from '../friend/StyledContainer';
import {
	apiDeleteMessage,
	apiPatchMessage,
	apiGetMessageCnt,
	apiGetMessages,
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
interface MessageType {
	count: number;
	next: string;
	previous: string;
	results: {
		id: number;
		fromUsers: {
			id: number;
			username: string;
			firstName: string;
			status: string;
			profileImage: string;
		};
		content: string;
		time: string;
		send: boolean;
		read: boolean;
	};
}

function MessageList() {
	const [totalMessageCnt, setTotalMessageCnt] = useState(0);
	const [messageCnt, setMessageCnt] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const [messages, setMessages] = useState([] as Array<MessageType>);

	const getTotalMessageCnt = () => {
		apiGetMessageCnt()
			.then(res => {
				setTotalMessageCnt(res.data.countAll);
				setMessageCnt(res.data.count);
			})
			.catch();
	};
	const getMessages = () => {
		apiGetMessages('1', page.toString(), limit.toString())
			.then(res => {
				console.log(res.data);
				setMessages(res.data);
			})
			.catch(() => {});
	};

	useEffect(() => {
		getMessages();
	}, [page, limit]);

	useEffect(() => {
		getTotalMessageCnt();
	}, []);
	return (
		<StyledContainer>
			<StyledTitle>주고 받은 쪽지</StyledTitle>
			<p>
				안 읽은 쪽지: {messageCnt} / 전체 쪽지: {totalMessageCnt}
			</p>

			{/* {messages && messages.map(message => <h1>{message.results?.content}</h1>)} */}
			<StyledReadBtn
				onClick={e => {
					e.preventDefault();

					try {
						apiPatchMessage('1', '1');
						// window.location.reload();
					} catch (error) {
						// console.log(error);
					}
				}}
			>
				읽음
			</StyledReadBtn>
			<StyledMessageDeleteBtn
				onClick={e => {
					e.preventDefault();

					try {
						apiDeleteMessage('1', '1');
						// window.location.reload();
					} catch (error) {
						// console.log(error);
					}
				}}
			>
				삭제
			</StyledMessageDeleteBtn>
		</StyledContainer>
	);
}

export default MessageList;
