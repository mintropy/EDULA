import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import ScheduleItem from './ScheduleItem';
import ScheduleDate from './ScheduleDate';
import {
	apiGetStudentLectureList,
	apiGetUserStatus,
	apiGetTeacherLectureList,
} from '../../api/user';
import UserContext from '../../context/user';

const StyledContainer = styled.div`
	height: 100%;
	width: 25em;
	margin: 1em;
	padding: 1em;
	color: ${props => props.theme.fontColor};
	background-color: ${props => props.theme.subBgColor};
`;

interface ScheduleDataType {
	id: number;
	name: string;
	timeList: {
		count: number;
		lectures: {
			day: string;
			st: string;
			end: string;
		}[];
	};
	school: number;
	teacher: number;
	studentList: number[];
}

interface ScheduleItemDataType {
	id: number;
	name: string;
	time: {
		day: string;
		st: string;
		end: string;
	};
}

interface ScheduleItemProps {
	day: string;
	st: string;
	end: string;
}

function ScheduleContainer() {
	const [dayName, setDayName] = useState('');

	const today = new Date();
	const dayIdx = today.getDay();

	const { userId } = useContext(UserContext);
	const [userStat, setUserStat] = useState('');
	const [scheduleData, setScheduleData] = useState(
		[] as Array<ScheduleItemDataType>
	);

	useEffect(() => {
		switch (dayIdx) {
			case 0:
				setDayName('sun');
				break;
			case 1:
				setDayName('mon');
				break;
			case 2:
				setDayName('tues');
				break;
			case 3:
				setDayName('wed');
				break;
			case 4:
				setDayName('thus');
				break;
			case 5:
				setDayName('fri');
				break;
			case 6:
				setDayName('sat');
				break;

			default:
				break;
		}
	}, []);

	useEffect(() => {
		if (userId) {
			apiGetUserStatus(userId || '')
				.then(res => {
					setUserStat(res.data.status);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [userId]);

	useEffect(() => {
		if (userStat) {
			switch (userStat) {
				case 'ST':
					apiGetStudentLectureList(userId || '').then(res => {
						const dayLectureData = [] as ScheduleItemDataType[];
						res.data.lectureList.forEach((lecture: ScheduleDataType) => {
							lecture.timeList.lectures.forEach((idx: ScheduleItemProps) => {
								if (idx.day === dayName) {
									dayLectureData.push({
										id: lecture.id,
										name: lecture.name,
										time: {
											day: idx.day,
											st: idx.st,
											end: idx.end,
										},
									});
								}
							});
						});
						setScheduleData(dayLectureData);
					});
					break;

				case 'TE':
					apiGetTeacherLectureList(userId || '').then(res => {
						const dayLectureData = [] as ScheduleItemDataType[];
						res.data.lectureList.forEach((lecture: ScheduleDataType) => {
							lecture.timeList.lectures.forEach((idx: ScheduleItemProps) => {
								if (idx.day === dayName) {
									dayLectureData.push({
										id: lecture.id,
										name: lecture.name,
										time: {
											day: idx.day,
											st: idx.st,
											end: idx.end,
										},
									});
								}
							});
						});
						setScheduleData(dayLectureData);
					});
					break;

				default:
					break;
			}
		}
	}, [userStat]);

	if (scheduleData) {
		return (
			<StyledContainer>
				<ScheduleDate />

				{scheduleData.map(sub => (
					<ScheduleItem
						key={sub.id}
						scheduleId={sub.id}
						name={sub.name}
						startAt={sub.time?.st}
						endAt={sub.time?.end}
					/>
				))}

				{scheduleData.length === 0 && (
					<img src='../../../images/noclass.gif' width='200' alt='수업 없음' />
				)}
			</StyledContainer>
		);
	}
	return <h1>로딩 중</h1>;
}

export default ScheduleContainer;
