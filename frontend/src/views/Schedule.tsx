import styled from 'styled-components';
import ScheduleAllContainer from '../components/schedule/ScheduleAllContainer';
import ScheduleContainer from '../components/schedule/ScheduleContainer';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
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
