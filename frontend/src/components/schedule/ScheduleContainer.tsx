import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ScheduleItem from './ScheduleItem';
import ScheduleDate from './ScheduleDate';
import { apiGetLectures } from '../../api/lecture';
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
const StyledLink = styled(Link)`
	text-decoration: none;
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

function ScheduleContainer() {
	const { userId } = useContext(UserContext);
	const [userStat, setUserStat] = useState('');
	const [scheduleData, setScheduleData] = useState([{} as ScheduleDataType]);

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
						setScheduleData(res.data.lectureList);
					});
					break;
				case 'TE':
					apiGetTeacherLectureList(userId || '').then(res => {
						setScheduleData(res.data.lectureList);
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
					<StyledLink key={sub.id} to={`/lecture/${sub.id}/`}>
						<ScheduleItem
							name={sub.name}
							startAt='11:00'
							endAt='12:00'
							// startAt={sub.timeList.lectures[0].st}
							// endAt={sub.timeList.lectures[0].end}
						/>
					</StyledLink>
				))}
			</StyledContainer>
		);
	}
	return <h1>수업이 없나?? 로딩 중입니다.!</h1>;
}

export default ScheduleContainer;
