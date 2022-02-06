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
	width: 500px;
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
			startAt: string;
			endAt: string;
		}[];
	};
	school: number;
	teacher: number;
	studentList: number[];
}
interface ScheduleItemProps {
	day: string;
	startAt: string;
	endAt: string;
}

function ScheduleContainer() {
	const [dayName, setDayName] = useState('');

	const today = new Date();
	const dayIdx = today.getDay();

	const { userId } = useContext(UserContext);
	const [userStat, setUserStat] = useState('');
	const [scheduleData, setScheduleData] = useState([{} as ScheduleDataType]);

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
						const dayLectureData = [] as ScheduleDataType[];
						res.data.lectureList.forEach((lecture: ScheduleDataType) => {
							lecture.timeList.lectures.forEach((idx: ScheduleItemProps) => {
								if (idx.day === dayName) {
									dayLectureData.push(lecture);
								}
							});
						});
						setScheduleData(dayLectureData);
					});
					break;

				case 'TE':
					apiGetTeacherLectureList(userId || '').then(res => {
						const dayLectureData = [] as ScheduleDataType[];
						res.data.lectureList.forEach((lecture: ScheduleDataType) => {
							lecture.timeList.lectures.forEach((idx: ScheduleItemProps) => {
								if (idx.day === dayName) {
									dayLectureData.push(lecture);
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
						id={sub.id}
						name={sub.name}
						startAt='11'
						endAt='12'
						// startAt={sub.timeList.lectures[0].st || '미정'}
						// endAt={sub.timeList.lectures[0].end || '미정'}
					/>
				))}
			</StyledContainer>
		);
	}
	return <h1>수업이 없나?? 로딩 중입니다.!</h1>;
}

export default ScheduleContainer;
