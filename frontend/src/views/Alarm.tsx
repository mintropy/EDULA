import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	apiDeleteNotification,
	apiGetNotifications,
	apiPatchNotification,
} from '../api/notice';
import StyledDeleteBtn from '../components/friend/StyledDeleteBtn';
import routes from '../routes';
import Pagination from '../components/class/ArticlePagination';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 1em 1em;
	color: ${props => props.theme.fontColor};
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${props => props.theme.fontColor};
	font-size: 1.5em;
`;

const StyleRefuseBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.subBgColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;
interface NotificationDataType {
	id: number;
	fromUser: {
		id: number;
		username: string;
		firstName: string;
		status: string;
	};
	lecture: {
		id: number;
		name: string;
		shcool: string;
	};
	name: string;
	timeList: string;
	shcool: string;
	studentList: number[];
	notificationType: string;
	content: string;
	read: boolean;
}

function Alarm() {
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const [notifications, setNotifications] = useState(
		[] as Array<NotificationDataType>
	);

	const getNotifications = () => {
		apiGetNotifications(page.toString(), limit.toString())
			.then(res => {
				setNotifications(res.data?.notifications);
				setTotal(res.data?.totalCount);
			})
			.catch(() => {});
	};
	useEffect(() => {
		getNotifications();
	}, [page, limit]);

	return (
		<>
			<StyledTitle>새 소식</StyledTitle>

			{notifications.length !== 0 && (
				<>
					<label htmlFor='limit'>
						페이지 당 표시할 소식 수:&nbsp;
						<select
							value={limit}
							onChange={({ target: { value } }) => setLimit(Number(value))}
						>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='12'>12</option>
							<option value='20'>20</option>
						</select>
					</label>
					<StyleRefuseBtn
						onClick={e => {
							e.preventDefault();

							try {
								apiDeleteNotification('0');
								window.location.reload();
							} catch (error) {
								// console.log(error);
							}
						}}
					>
						모두 삭제
					</StyleRefuseBtn>
					<StyleRefuseBtn
						onClick={e => {
							e.preventDefault();

							try {
								apiPatchNotification('0');
								window.location.reload();
							} catch (error) {
								// console.log(error);
							}
						}}
					>
						모두 읽음
					</StyleRefuseBtn>
				</>
			)}

			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'FQ')
					.map(noti => (
						<StyledLink key={noti.id} to={routes.friend}>
							{noti.content === null && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName || '이름 없음'}
									)에게 친구 요청을 받았어요!
								</p>
							)}
							{noti.content === 'AC' && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName || '이름 없음'}
									)가(이) 친구 요청을 수락했어요!
								</p>
							)}
							{noti.content === 'RF' && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName || '이름 없음'}
									)가(이) 친구 요청을 거절했어요ㅠ
								</p>
							)}
							<StyleRefuseBtn
								onClick={e => {
									e.preventDefault();

									try {
										apiDeleteNotification(noti.id.toString());
										window.location.reload();
									} catch (error) {
										// console.log(error);
									}
								}}
							>
								삭제
							</StyleRefuseBtn>
							<StyleRefuseBtn
								onClick={e => {
									e.preventDefault();

									try {
										apiPatchNotification(noti.id.toString());
										window.location.reload();
									} catch (error) {
										// console.log(error);
									}
								}}
							>
								읽음
							</StyleRefuseBtn>
						</StyledLink>
					))}
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HC')
					.map(noti => (
						<StyledLink to={`/lecture/${noti.lecture?.id}`}>
							<p>
								{noti.lecture?.name}과목의 {noti.content} 과제 선물이 도착했어요!
							</p>
							<StyleRefuseBtn
								onClick={e => {
									e.preventDefault();

									try {
										apiDeleteNotification(noti.id.toString());
										window.location.reload();
									} catch (error) {
										// console.log(error);
									}
								}}
							>
								읽음
							</StyleRefuseBtn>
						</StyledLink>
					))}
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HU')
					.map(noti => (
						<StyledLink to={`/lecture/${noti.lecture?.id}`}>
							<p>
								{noti.lecture?.name}과목의 {noti.content} 과제가 변경되었어요!
							</p>
							<StyleRefuseBtn
								onClick={e => {
									e.preventDefault();

									try {
										apiDeleteNotification(noti.id.toString());
										window.location.reload();
									} catch (error) {
										// console.log(error);
									}
								}}
							>
								읽음
							</StyleRefuseBtn>
						</StyledLink>
					))}
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HS')
					.map(noti => (
						<StyledLink to={`/lecture/${noti.lecture?.id}`}>
							<p>
								{noti.lecture?.name} 과목의 {noti.fromUser?.firstName}가 {noti.content}
								과제를 제출했어요!
							</p>
							<StyleRefuseBtn
								onClick={e => {
									e.preventDefault();

									try {
										apiDeleteNotification(noti.id.toString());
										window.location.reload();
									} catch (error) {
										// console.log(error);
									}
								}}
							>
								읽음
							</StyleRefuseBtn>
						</StyledLink>
					))}
			{notifications.length === 0 && (
				<StyledTitle>새로운 소식이 없어요~</StyledTitle>
			)}

			{notifications.length !== 0 && (
				<footer>
					<Pagination total={total} limit={limit} page={page} setPage={setPage} />
				</footer>
			)}
		</>
	);
}

export default Alarm;
