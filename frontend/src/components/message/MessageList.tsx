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
import Pagination from '../class/ArticlePagination';

const StyledReadBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.bgColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;
const ReadMessage = styled.p`
	opacity: 0.5;
`;

const StyledMessageDeleteBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.borderColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;
interface MessageType {
	id: number;
	fromUser: {
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
}

function MessageList() {
	const [totalMessageCnt, setTotalMessageCnt] = useState(0);
	const [messageCnt, setMessageCnt] = useState(0);
	const [limit, setLimit] = useState(5);
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
		apiGetMessages('0', page.toString(), limit.toString())
			.then(res => {
				setMessages(res.data.messages);
				setTotal(res.data.totalCount);
			})
			.catch(() => {});
	};

	useEffect(() => {
		getMessages();
	}, [page, limit, totalMessageCnt]);

	useEffect(() => {
		getTotalMessageCnt();
	}, []);
	return (
		<StyledContainer>
			<StyledTitle>주고 받은 쪽지</StyledTitle>
			<p>
				안 읽은 쪽지: {messageCnt} / 전체 쪽지: {totalMessageCnt}
			</p>

			{messages &&
				messages.map(message => (
					<>
						{!message.read && (
							<p key={message.id}>
								{message.time.slice(0, 10)} | {message.fromUser?.username} (
								{message.fromUser?.firstName || '이름 없음'}) | {message.content}
								<StyledReadBtn
									onClick={e => {
										e.preventDefault();

										try {
											apiPatchMessage(
												message.fromUser?.id.toString(),
												message.id.toString()
											);
											window.location.reload();
										} catch (error) {
											// console.log(error);
										}
									}}
								>
									읽음
								</StyledReadBtn>
							</p>
						)}
						{message.read && (
							<ReadMessage key={message.id}>
								{message.time.slice(0, 10)} | {message.fromUser?.username} (
								{message.fromUser?.firstName || '이름 없음'}) : {message.content}
							</ReadMessage>
						)}
						<StyledMessageDeleteBtn
							onClick={e => {
								e.preventDefault();

								try {
									apiDeleteMessage(
										message.fromUser?.id.toString(),
										message.id.toString()
									).then(() => {
										window.location.reload();
									});
								} catch (error) {
									// console.log(error);
								}
							}}
						>
							삭제
						</StyledMessageDeleteBtn>
					</>
				))}
			{messages.length === 0 && <StyledTitle>새로운 메시지가 없어요~</StyledTitle>}
			{messages.length !== 0 && (
				<footer>
					<Pagination total={total} limit={limit} page={page} setPage={setPage} />
				</footer>
			)}
		</StyledContainer>
	);
}

export default MessageList;
