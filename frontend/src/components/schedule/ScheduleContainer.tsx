import styled from 'styled-components';
import ScheduleItem from './ScheduleItem';
import ScheduleDate from './ScheduleDate';

const StyledContainer = styled.div`
	height: 100%;
	width: 500px;
	margin: 1em;
	padding: 1em;
	color: ${props => props.theme.fontColor};
	background-color: ${props => props.theme.subBgColor};
`;

function ScheduleContainer() {
	// api로 그 사람(학생 or 교사) 그날 시간표 받아오기
	const scheduleData = [
		{
			pk: 1,
			name: '수학',
			startAt: '01:00',
			endAt: '01:40',
		},
		{
			pk: 2,
			name: '과학',
			startAt: '02:00',
			endAt: '02:40',
		},
		{
			pk: 3,
			name: '수학',
			startAt: '03:00',
			endAt: '03:40',
		},
	];

	return (
		<StyledContainer>
			<ScheduleDate />
			<ul>
				{scheduleData.map(sub => (
					<ScheduleItem
						key={sub.pk}
						name={sub.name}
						startAt={sub.startAt}
						endAt={sub.endAt}
					/>
				))}
			</ul>
		</StyledContainer>
	);
}

export default ScheduleContainer;
