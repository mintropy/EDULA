import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiGetNotifications } from '../api/notice';
import AlarmItem from '../components/alarm/AlarmItem';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 1em 1em;
	color: ${props => props.theme.fontColor};
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
	const [notifications, setNotifications] = useState(
		[] as Array<NotificationDataType>
	);

	useEffect(() => {
		apiGetNotifications('1', '2')
			.then(res => {
				setNotifications(res.data.notifications);
			})
			.catch(() => {});
	}, []);
	console.log(notifications);

	return (
		<>
			<StyledTitle>새 소식</StyledTitle>
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'FQ')
					.map(noti => (
						<div key={noti.id}>
							{noti.content === null && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName})에게 친구 요청을
									받았어요!
								</p>
							)}
							{noti.content === 'AC' && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName})가(이) 친구 요청을
									수락했어요!
								</p>
							)}
							{noti.content === 'RF' && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName})가(이) 친구 요청을
									거절했어요ㅠ
								</p>
							)}
						</div>
					))}
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HC')
					.map(noti => (
						<div>
							<p>
								{noti.lecture?.name}과목의 {noti.content} 과제 선물이 도착했어요!
							</p>
						</div>
					))}

			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HU')
					.map(noti => (
						<div>
							<p>
								{noti.lecture?.name}과목의 {noti.content} 과제가 변경되었어요!
							</p>
						</div>
					))}

			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HS')
					.map(noti => (
						<div>
							<p>
								{noti.lecture?.name}과목의 {noti.fromUser?.firstName}가 {noti.content}
								과제를 제출했어요!
							</p>
						</div>
					))}
		</>
	);
}

export default Alarm;
