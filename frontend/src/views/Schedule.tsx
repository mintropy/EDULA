import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import ScheduleAllContainer from '../components/schedule/ScheduleAllContainer';
import ScheduleContainer from '../components/schedule/ScheduleContainer';

const Container = styled.div`
	position: absolute;
	top: 20%;
	left: 40%;
`;

function Schedule() {
	return (
		<Container>
			<PageTitle title='오늘의 일정' />
			<ScheduleContainer />
			<ScheduleAllContainer />
		</Container>
	);
}

export default Schedule;
