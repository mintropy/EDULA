import styled from 'styled-components';
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
			<ScheduleContainer />
			<ScheduleAllContainer />
		</Container>
	);
}

export default Schedule;
