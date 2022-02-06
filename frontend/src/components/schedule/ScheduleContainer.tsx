import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ScheduleItem from './ScheduleItem';
import ScheduleDate from './ScheduleDate';
import { apiGetLectures } from '../../api/lecture';
import { apiGetStudentLectureList } from '../../api/user';

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
	const [scheduleData, setScheduleData] = useState([{} as ScheduleDataType]);

	useEffect(() => {
		apiGetStudentLectureList('1').then(res => {
			setScheduleData(res.data.lectureList);
			console.log(res.data);
		});
	}, []);

	if (scheduleData) {
		return (
			<StyledContainer>
				<ScheduleDate />

				{scheduleData.map(sub => (
					<StyledLink key={sub.id} to={`/lecture/${sub.id}/`}>
						<ScheduleItem
							key={sub.id}
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
	return <h1>로딩 중입니다.</h1>;
}

export default ScheduleContainer;
